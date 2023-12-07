/*
 * File Name: change-password.post.ts
 * Author: neptos
 * Creation Date: 2023
 *
 * Copyright (c) 2023 Tux Inc. (Qraft)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { ChangePassword, User } from "~/types/user";
import { updateUser } from "~/server/models/user";

export default defineEventHandler(async (event) => {
    const userWithPassword: User | undefined = event.context.user;
    console.log(userWithPassword);
    if (!userWithPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
            message: "Invalid username or password",
        });
    }

    const body: ChangePassword = await readBody<ChangePassword>(event);
    console.log(body);
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing body",
        });
    }

    console.log(body.oldPassword);
    console.log(body.newPassword);
    if (!body.oldPassword || !body.newPassword) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing oldPassword or newPassword",
        });
    }

    const verified = await verify(body.oldPassword, userWithPassword.password);
    if (!verified) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
            message: "Invalid password",
        });
    }

    userWithPassword.password = await hash(body.newPassword);
    await updateUser(userWithPassword.id, userWithPassword);

    const { password: _password, ...userWithoutPassword } = userWithPassword;

    return {
        user: userWithoutPassword,
    };
});
