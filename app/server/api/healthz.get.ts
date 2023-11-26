const startupTime = new Date()

const handler = eventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    await prisma.$queryRaw`SELECT 1;`
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'DB failed initialization check' })
  }

  return {
    status: 'healthy',
    time: new Date(),
    startupTime,
    nuxtAppVersion: useRuntimeConfig().version || 'unknown'
  }
})

export type HealthCheckData = Awaited<ReturnType<typeof handler>>
export default handler
