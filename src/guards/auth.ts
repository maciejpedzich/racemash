import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export async function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { isLoggedIn, loadUser } = useAuth();

  await loadUser();

  if (!to.meta.authRequired || isLoggedIn.value) {
    return next();
  } else {
    localStorage.setItem('redirectPath', to.fullPath);
    return next('/log-in');
  }
}