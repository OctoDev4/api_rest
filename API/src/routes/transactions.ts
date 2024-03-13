import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify' // Importa FastifyInstance, FastifyRequest e FastifyReply de fastify
import { knex } from '../database' // Importa knex do seu módulo de banco de dados
import { z } from 'zod' // Importa z do módulo zod
import { randomUUID } from 'crypto' // Importa randomUUID do módulo crypto
import { checkSessionIdExist } from '../middlewares/check-sessionId-exist'

// Função que define as rotas relacionadas a transações
export async function transactionRoutes(app: FastifyInstance) {
  // Adiciona um gancho para logar as requisições antes do tratamento
  app.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(`[${request.method}] ${request.url}`)
    },
  )

  // Rota GET para obter todas as transações
  app.get(
    '/',
    { preHandler: [checkSessionIdExist] }, // Middleware para verificar a existência da sessionId
    async function (request: FastifyRequest) {
      const sessionId = request.cookies.sessionId
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return {
        transactions,
      }
    },
  )

  // Rota GET para obter um resumo das transações
  app.get(
    '/summary',
    { preHandler: [checkSessionIdExist] }, // Middleware para verificar a existência da sessionId
    async (request) => {
      const sessionId = request.cookies.sessionId
      const summary = await knex('transactions')
        .sum('amount', { as: 'amount' })
        .where('session_id', sessionId)
        .first()
      return { summary }
    },
  )

  // Rota GET para obter uma transação específica pelo ID
  app.get('/:id', { preHandler: [checkSessionIdExist] }, async (request) => {
    // Esquema para validar os parâmetros da requisição
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(), // ID deve ser uma UUID
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)
    const sessionId = request.cookies.sessionId

    const transaction = await knex('transactions')
      .where({ session_id: sessionId, id })
      .first()

    return { transaction }
  })

  // Rota POST para criar uma transação
  app.post('/', async (request, reply) => {
    // Esquema para validar o corpo da requisição
    const createTransactionBodySchema = z.object({
      name: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']), // Tipo da transação deve ser 'credit' ou 'debit'
    })

    const { name, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    // Se sessionId não existir, cria um novo e define no cookie
    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
    }

    // Insere a transação no banco de dados
    await knex('transactions').insert({
      id: randomUUID(),
      name,
      amount: type === 'credit' ? amount : amount * -1, // Se for débito, inverte o sinal do valor
      session_id: sessionId,
    })

    return reply.status(201).send() // Retorna status de sucesso
  })
}
