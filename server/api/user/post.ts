import { createUser } from "~/server/models/user";
import { User } from "~/types/user";

export default defineEventHandler(async (event) => {
    const body = await readBody<User>(event);

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad request',
            message: 'Missing body',
        });
    }

    if (!body.username || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad request',
            message: 'Missing username or password',
        });
    }

    const hashedPassword = await hash(body.password);
    body.password = hashedPassword;

    const user = await createUser(body);
});
