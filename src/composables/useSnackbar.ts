import { reactive, toRefs } from 'vue';

interface Snackbar {
  visible: boolean;
  status: '' | 'error' | 'success';
  message: string;
}

const snackbar = reactive<Snackbar>({
  status: '',
  message: '',
  visible: false
});

export function useSnackbar() {
  const showSnackbar = (options: Omit<Snackbar, 'visible'>) =>
    Object.assign(snackbar, { ...options, visible: true });

  return { ...toRefs(snackbar), showSnackbar };
}
