// Importa e carrega as variáveis de ambiente do arquivo .env

import { app } from './app'
import { env } from './env'

// Inicialização do servidor Fastify
app
  .listen({
    port: env.PORT, // Utiliza a porta especificada nas variáveis de ambiente
  })
  .then(() => {
    console.log('Servidor rodando na porta', env.PORT) // Exibe mensagem indicando que o servidor está rodando
  })
