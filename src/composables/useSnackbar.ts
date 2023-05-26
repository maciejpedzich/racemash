import { reactive, toRefs } from 'vue';

interface Snackbar {
  visible: boolean;
  color: '' | 'error' | 'success';
  title: string;
  message: string;
}

const snackbar = reactive<Snackbar>({
  color: '',
  title: '',
  message: '',
  visible: false
});

export function useSnackbar() {
  const showSnackbar = (options: Omit<Snackbar, 'visible'>) =>
    Object.assign(snackbar, { ...options, visible: true });

  return { ...toRefs(snackbar), showSnackbar };
}
