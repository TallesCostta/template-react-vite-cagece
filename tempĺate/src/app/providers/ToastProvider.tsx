import { Toast } from 'primereact/toast';
import { toastRef } from '../../shared/lib/ref/toast/toastRef';

export const ToastProvider = () => {
  return <Toast ref={toastRef} />;
};
