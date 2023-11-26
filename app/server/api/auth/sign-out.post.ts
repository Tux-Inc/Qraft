export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    });

    return {
        user: null,
    };
});
