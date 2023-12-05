import { PrismaClient } from '@prisma/client'
import { User } from '~/types/user'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient,
    user?: User
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
})
