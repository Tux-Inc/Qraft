import type { UserWithoutPassword } from "~/types/user"

export const useAuthUser = (): Ref<{ user: UserWithoutPassword } | null> => {
  return useState<{ user: UserWithoutPassword } | null>('user', () => null)
}
