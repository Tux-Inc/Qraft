export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthUser();
    console.log(user.value);
    if (!user.value) return navigateTo('/auth/sign-in');
})
