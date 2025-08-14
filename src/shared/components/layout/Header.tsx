import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import useAppStore from "../../store/appStore";
import logo from "../../components/assets/cagece_branco.png";
import Avatar from '../avatar';
import { useSa2 } from "react-sa2";
import { VITE_NOME_EXIBICAO_SISTEMA } from "../../constants";
import { Button } from 'primereact/button';
import { informacao } from '../../lib/ref/toast/notificacoes';

/**
 * Cabeçalho principal da aplicação, com logo, busca e ações do usuário.
 */
const Header: FC = () => {
  const { isDarkMode, toggleTheme, setSearchTerm, showAlert } = useAppStore();
  const location = useLocation();
  const {usuario, funcoesSa2} = useSa2();

  return (
    <header className="bg-[#2196f3] dark:bg-slate-900 shadow-lg sticky top-0 z-40 transition-colors duration-500 no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img className="h-10 w-auto" src={logo} alt="Logo GESUP" />
              <span className="text-2xl font-bold text-white hidden sm:inline">
                {VITE_NOME_EXIBICAO_SISTEMA}
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {location.pathname === "/" && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filtrar módulos..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/20 text-white placeholder-white/70 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/80 transition w-64 border border-transparent focus:bg-white/30"
                  />
                  <i
                    className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                    style={{ fontSize: '1.25rem' }}
                  ></i>
                </div>
              )}
              <Button
                icon="pi pi-question-circle"
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full"
                onClick={() =>
                  showAlert(
                    "A secção de Ajuda e Documentação será implementada aqui."
                  )
                }
                rounded
                text
              />
              <Button
                icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full"
                onClick={() => {
                  toggleTheme();
                  informacao(
                    isDarkMode
                      ? "Modo claro ativado."
                      : "Modo escuro ativado."
                  );
                }}
                rounded
                text
              />
              <Button
                icon="pi pi-bell"
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full p-badge-dotted"
                onClick={() => showAlert("Notificações ainda não implementadas.")}
                rounded
                text
              />
              <div className="flex items-center space-x-2 cursor-pointer group">
                <Avatar size={40} />
                <div className="text-sm text-white">
                  <p className="font-semibold">{usuario?.colaborador.colDscNome}</p>
                  <p className="opacity-80 text-[9px]">{usuario?.colaborador.funcaoGratificada.fugDscFuncaoGratificada ? usuario?.colaborador.funcaoGratificada.fugDscFuncaoGratificada : usuario?.colaborador.funcao.funDscFuncao} - {usuario?.colaborador.unidadeAdministrativa.uadSglUnidadeAdmin}</p>
                </div>
              </div>
            </div>
            <div className="h-10 w-px bg-white/60 opacity-20"></div>
            <div>
              <Button
                icon="pi pi-sign-out"
                className="text-white/80 hover:text-white transition-all duration-300"
                onClick={() => funcoesSa2.sair()}
                text
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-500"></div>
    </header>
  );
};

export default Header;
