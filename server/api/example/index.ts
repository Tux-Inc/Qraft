export default eventHandler((event) => {
  const prisma = event.context.prisma

  return prisma.example.findMany()
})
