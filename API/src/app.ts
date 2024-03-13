import 'dotenv/config'

// Importa o módulo Fastify
import fastify from 'fastify'

// Importa as rotas relacionadas a transações
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

// Definição do servidor Fastify
export const app = fastify()

app.register(cookie)

// Registra as rotas relacionadas a transações com um prefixo
app.register(transactionRoutes, {
  prefix: 'transactions',
})
