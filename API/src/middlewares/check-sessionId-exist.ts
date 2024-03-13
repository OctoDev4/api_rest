import { FastifyReply, FastifyRequest } from 'fastify'

// Função assíncrona que verifica se o sessionId existe nos cookies da requisição
export async function checkSessionIdExist(
  request: FastifyRequest, // Objeto que representa a requisição
  reply: FastifyReply, // Objeto que representa a resposta
) {
  // Obtém o sessionId dos cookies da requisição
  const sessionId = await request.cookies.sessionId

  // Verifica se o sessionId não existe
  if (!sessionId) {
    // Se não existir, retorna uma resposta de erro com status 401 (unauthorized)
    return reply.status(401).send({
      error: 'unauthorized', // Mensagem de erro
    })
  }
}
