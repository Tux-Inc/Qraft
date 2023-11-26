export default defineEventHandler(async (event) => {
    const userWithPassword = event.context.user;
    if (!userWithPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid username or password',
        });
    }

    const { password: _password, ...userWithoutPassword } = userWithPassword;

    return {
        user: userWithoutPassword,
    };
})
