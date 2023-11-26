import { H3Event } from "h3"
import { getUserById } from "../models/user";

export default function getUserFromSession(event: H3Event) {
    const config = useRuntimeConfig()

    const cookie = getCookie(event, config.cookieName)
    if (!cookie) return null;

    const unsignedSession = unsign(cookie, config.cookieSecret)
    if (!unsignedSession) return null;

    const session = deserialize(unsignedSession)

    return getUserById(session.userId)
}
