import { toastRef } from './toastRef';
import { ERRO_ACESSO, ERRO_NEGOCIO, tratarErroRest } from '../../../../service/tratarErro';

export const erro = (message: string, titulo?: string) => {
  toastRef.current?.show({
    severity: 'error',
    summary: titulo || 'ERRO!',
    detail: message,
    life : 5000,
  });
};

export const sucesso = (message: string, titulo?: string) => {
  toastRef.current?.show({
    severity: 'success',
    summary: titulo || 'SUCESSO!',
    detail: message,
    life : 5000,
  });
};


export const informacao = (message: string, titulo?: string) => {
  toastRef.current?.show({
    severity: 'info',
    summary: titulo || 'INFORMAÇÃO!',
    detail: message,
    life : 5000,
  });
};

export const advertencia = (message: string, titulo?: string) => {
  toastRef.current?.show({
    severity: 'warn',
    summary: titulo || 'ATENÇÃO!',
    detail: message,
    life : 5000,
  });
};


export const secundario = (message: string, titulo?: string) => {
  toastRef.current?.show({
    severity: 'secondary',
    summary: titulo || 'INFORMAÇÃO!',
    detail: message,
    life : 5000,
  });
};

export const tratarErro = (error: any) => {
  const msgError = tratarErroRest(error);

  if (msgError.codigoErro === ERRO_NEGOCIO || msgError.codigoErro === ERRO_ACESSO) {
    advertencia(msgError.mensagemErro);
  } else {
    erro(msgError.mensagemErro);
  }
};