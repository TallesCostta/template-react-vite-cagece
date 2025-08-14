import api from "./api";
import { PortalRotas, Rota, Module, SubMenu, RetornoMenuSa2, SubMenuItem } from "../shared/types";
import { MapeamentoMenusPrincipais } from "../shared/types/MapeamentoMenusPrincipais";

interface ApiNode {
  modSeqModulo: number;
  modNomModulo: string;
  modActModulo: string | null;
  modImgModulo: string | null;
  nomeApresentacao: string;
  itensArvore: ApiNode[];
  modFlgExcluirMenu?: boolean;
}

const portalRhUrlBase = 'http://localhost:8080/portalrh';

class MenuService {
  static async getMenuData(
    token: string,
    matricula: string
  ): Promise<PortalRotas> {
    try {
      const response = await api.get<RetornoMenuSa2>(
        `/sa2/api/v2/usuarios/${matricula}/permissoes/441`,
        {
          params: { matricula },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const apiData = response.data;
      return this.transformApiDataToPortalRotas(apiData);
    } catch (error) {
      console.error("Erro ao buscar os dados de menu:", error);
      throw error;
    }
  }

  private static cleanIconName(icon: string | null | undefined): string {
    if (!icon) return 'LayoutGrid';
    return icon.replace(/^['" ]+|['" ]+$/g, '');
  }

  /**
   * Constrói uma árvore de itens de menu a partir da estrutura da API, preservando a hierarquia.
   */
  private static buildMenuTree(nodes: ApiNode[], parentPath: string = ''): SubMenuItem[] {
    return nodes.map(node => {
      const currentPath = `${parentPath}/${node.modNomModulo}`.toLowerCase();
      const children = (node.itensArvore && node.itensArvore.length > 0)
        ? this.buildMenuTree(node.itensArvore, currentPath)
        : undefined;

      return {
        id: node.modNomModulo,
        titulo: node.nomeApresentacao,
        icon: this.cleanIconName(node.modImgModulo) || 'FileText',
        path: node.modActModulo ? `/iframe?url=${portalRhUrlBase}${node.modActModulo}` : (children ? '' : currentPath),
        children: children,
      };
    });
  }

  private static transformApiDataToPortalRotas(apiData: RetornoMenuSa2): PortalRotas {
    const rotas: Rota[] = [];
    const modulos: Module[] = [];
    const subMenus: Record<string, SubMenu> = {};
    const modulosDaApi = apiData.mapModulo['441'] || [];

    modulosDaApi.forEach((modulo) => {
      if (modulo.modFlgExcluirMenu) return;

      const mappingInfo = MapeamentoMenusPrincipais.find(
        (map) => map.modNomModulo === modulo.modNomModulo
      );

      const icon = this.cleanIconName(mappingInfo?.icon || modulo.modImgModulo);
      const hasSubMenu = modulo.itensArvore.length > 0;

      // O path do módulo principal sempre leva para o dashboard (se mapeado) ou para o submenu
      let path = `/${modulo.modNomModulo}`;
      if (mappingInfo) {
        path = `/iframe?url=${mappingInfo.modActModulo}`;
      } else if (!hasSubMenu && modulo.modActModulo) {
        path = `/iframe?url=${portalRhUrlBase}${modulo.modActModulo}`;
      }

      modulos.push({
        id: modulo.modNomModulo,
        titulo: mappingInfo?.nomeApresentacao || modulo.nomeApresentacao,
        path: path,
        icon: icon,
        hasSubMenu: hasSubMenu,
      });

      if (hasSubMenu) {
        subMenus[`/${modulo.modNomModulo}`] = {
          titulo: mappingInfo?.nomeApresentacao || modulo.nomeApresentacao,
          icon: icon,
          // Usa a nova função para construir a árvore de sub-itens
          items: this.buildMenuTree(modulo.itensArvore),
        };
      }
    });

    return { rotas, modulos, subMenus };
  }
}

export default MenuService;
