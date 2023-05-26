import { ref, computed } from 'vue';
import { Models } from 'appwrite';

import { account } from '@/appwrite';

const user = ref<Models.User<Models.Preferences> | null>(null);
const loadingUserFinished = ref(false);
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
      `${location.origin}${redirectPath}#login-success`,
      `${location.origin}/log-in#login-error`,
      permissionScopes
    );
  };

  const loadUser = async () => {
    try {
      if (loadingUserFinished.value) return;

      const currentUser = await account.get();
      user.value = currentUser;
    } finally {
      loadingUserFinished.value = true;
    }
  };

  const logOut = async () => {
    await account.deleteSession('current');
    user.value = null;
  };

  return {
    user,
    loadingUserFinished,
    isLoggedIn,
    logIn,
    loadUser,
    logOut
  };
}
