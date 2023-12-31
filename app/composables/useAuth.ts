import type { UserWithoutPassword } from "~/types/user";
import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const setCookie = (cookie: any) => {
    cookie.value = cookie;
  };

  const login = async (username: string, password: string) => {
    const data = await $fetch<UserWithoutPassword>("/auth/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });

    setUser(data);

    return authUser;
  };

  const logout = async () => {
    const data = await $fetch("/auth/logout", {
      method: "POST",
    });

    setUser(data);
  };

  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch("/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        setUser(data);
      } catch (error) {
        setCookie(null);
      }
    }

    return authUser;
  };

  return {
    login,
    logout,
    me,
  };
}
