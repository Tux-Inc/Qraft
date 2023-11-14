import { getUserByUsername } from "~/server/models/user";
import { verify } from "~/server/utils/password";
import { UserLogin } from "~/types/user";

export default defineEventHandler(async (event) => {
  const body = await readBody<UserLogin>(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Missing body',
    })
  }

  const { username, password } = body
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Missing username or password',
    })
  }

  const userWithPassword = await getUserByUsername(username)
  if (!userWithPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid username or password',
    })
  }

  const verified = await verify(password, userWithPassword.password)
  if (!verified) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid username or password',
    })
  }

  const config = useRuntimeConfig()

  const session = serialize({ userId: userWithPassword.id })
  const signedSession = sign(session, config.cookieSecret)

  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + config.cookieExpires),
  });

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return {
    user: userWithoutPassword,
  }
})
