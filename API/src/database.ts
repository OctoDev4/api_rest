// Importa e carrega as variáveis de ambiente do arquivo .env
import 'dotenv/config'

// Importa o Knex e o renomeia para setupKnex
import { knex as setupKnex, Knex } from 'knex'

// Importa o objeto env que contém as variáveis de ambiente
import { env } from './env'

// Configuração do Knex
export const config: Knex.Config = {
  client: 'sqlite3', // Define o cliente do banco de dados como SQLite
  connection: {
    filename: env.DATABASE_URL, // Define o nome do arquivo de banco de dados a partir das variáveis de ambiente
  },
  useNullAsDefault: true, // Usa NULL como valor padrão quando um valor é indefinido no SQLite
  migrations: {
    extension: 'ts', // Define a extensão dos arquivos de migração como .ts
    directory: './db/migrations', // Define o diretório onde estão localizados os arquivos de migração
  },
}

// Inicialização do Knex com a configuração definida
export const knex = setupKnex(config)
