export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig();
    const cookie = useCookie(config.cookieName);
    if (!cookie.value && to.path !== '/auth/sign-in' && process.server) {
        return '/auth/sign-in';
    }
})
