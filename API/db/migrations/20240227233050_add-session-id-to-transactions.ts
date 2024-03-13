import type { Knex } from 'knex'

// Função para realizar a migração "up" (adição da coluna session_id na tabela transactions)
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index() // Adiciona uma coluna session_id após a coluna id, com tipo uuid e índice
  })
}

// Função para realizar a migração "down" (remoção da coluna session_id da tabela transactions)
export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id') // Remove a coluna session_id da tabela transactions
  })
}
