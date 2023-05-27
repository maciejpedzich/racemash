import { reactive, toRefs } from 'vue';

interface Snackbar {
  visible: boolean;
  status: '' | 'error' | 'success';
  message: string;
}

const snackbar = reactive<Snackbar>({
  visible: false,
  status: '',
  message: ''
});

export function useSnackbar() {
  const showSnackbar = (options: Omit<Snackbar, 'visible'>) =>
    Object.assign(snackbar, { ...options, visible: true });

  return { ...toRefs(snackbar), showSnackbar };
}
