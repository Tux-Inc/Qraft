export default eventHandler(async (event) => {
  const prisma = event.context.prisma
  const { params } = event.context

  const id = params?.id
  const body = await readBody(event)
  const data = {
    id,
    ...body
  }
  return prisma.example.upsert({ where: { id }, create: data, update: data })
})
