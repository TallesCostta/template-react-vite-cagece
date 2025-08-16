import { TokenError } from './TokenError';

export interface MensagemErro {
  mensagemErro: string;
  codigoErro: number;
}

export const ERRO_NEGOCIO = 422;
export const ERRO_ACESSO = 403;

export const tratarErroRest = (erro: any): MensagemErro => {
  if (erro.response) {
    if (erro.response.status === ERRO_ACESSO) {
      return {
        mensagemErro:
          'Sua sessão expirou por inatividade ou seu acesso foi negado. Recarregue o sistema para tentar novamente.',
        codigoErro: ERRO_ACESSO,
      };
    }

    if (erro.response.status === 404) {
      return { mensagemErro: 'Registro não encontrado!', codigoErro: 404 };
    }

    if (erro.response.status === 409 || erro.response.status === ERRO_NEGOCIO) {
      let errors;
      if (erro.response.data && erro.response.data.errors) {
        errors = erro.response.data.errors;
      } else if (erro.response.errors) {
        errors = JSON.parse(erro.response.errors);
      } else {
        return { mensagemErro: 'Erro de negócio desconhecido.', codigoErro: ERRO_NEGOCIO };
      }

      const msgs = errors.map((e: any) => e.mensagem || e.message);
      return { mensagemErro: msgs.join('\n'), codigoErro: ERRO_NEGOCIO };
    }
  }

  if (erro instanceof TokenError) {
    return { mensagemErro: erro.message, codigoErro: 423 };
  }

  return { mensagemErro: 'Ocorreu um erro', codigoErro: 500 };
};