import { ref, computed } from 'vue';
import { Models } from 'appwrite';

import { account } from '@/appwrite';

const user = ref<Models.User<Models.Preferences> | null>(null);
const userLoadingFinished = ref(false);
const isLoggedIn = computed(() => !!user.value);

export function useAuth() {
  const logIn = (provider: 'github' | 'discord') => {
    const redirectPath = localStorage.getItem('redirectPath') || '/';
    const permissionScopes =
      provider === 'github'
        ? ['read:user', 'user:email']
        : ['identify', 'email'];

    account.createOAuth2Session(
      provider,
      `${location.origin}${redirectPath}`,
      `${location.origin}/log-in#oauth-error`,
      permissionScopes
    );
  };

  const loadUser = async () => {
    try {
      if (userLoadingFinished.value) return;

      const currentUser = await account.get();
      user.value = currentUser;
    } catch (error) {
      // TODO: Add to globaL Vue error logger and implement snackbar message bus
      console.error(error);
      user.value = null;
    } finally {
      userLoadingFinished.value = true;
    }
  };

  const logOut = async () => {
    await account.deleteSession('current');
    user.value = null;
  };

  return {
    user,
    userLoadingFinished,
    isLoggedIn,
    logIn,
    loadUser,
    logOut
  };
}
