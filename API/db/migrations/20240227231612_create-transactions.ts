import type { Knex } from 'knex'

// Função para realizar a migração "up" (criação da tabela transactions)
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary() // Coluna para o ID da transação, definida como chave primária
    table.text('name').notNullable() // Coluna para o nome da transação, não pode ser nulo
    table.decimal('amount', 10, 2).notNullable() // Coluna para o valor da transação, não pode ser nulo
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable() // Coluna para a data de criação da transação, padrão é a data atual
  })
}

// Função para realizar a migração "down" (remoção da tabela transactions)
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions') // Remove a tabela transactions
}
