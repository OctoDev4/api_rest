// Desativa temporariamente o linting (verificação de código) do ESLint na próxima linha.
// Isso é útil para evitar que o ESLint alerte sobre certos tipos de problemas que você sabe que são seguros ignorar em circunstâncias específicas.
// Neste caso, é necessário desativar o linting para a declaração de módulo, pois o ESLint pode não reconhecê-la como uma construção de tipo válida.
// eslint-disable-next-line
import knex from 'knex';

// Declaração de módulo para adicionar tipagem a tabelas específicas do banco de dados.
declare module 'knex/types/tables' {
  // Exporta uma interface chamada Tables, que representa as tabelas do banco de dados.
  export interface Tables {
    // Define a estrutura da tabela transactions.
    transactions: {
      // Uma string que representa o identificador único da transação.
      id: string
      // Uma string que representa o nome da transação.
      name: string
      // Um número que representa o valor da transação.
      amount: number
      // Uma string que representa a data e hora em que a transação foi criada.
      created_at: string
      // (opcional) Uma string que representa o identificador único da sessão relacionada à transação.
      session_id?: string
    }
  }
}
