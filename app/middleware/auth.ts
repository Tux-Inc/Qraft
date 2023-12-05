export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthUser();
    if (!user.value) return navigateTo('/auth/sign-in');
})
