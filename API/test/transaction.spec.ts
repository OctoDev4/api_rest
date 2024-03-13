import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { app } from '../src/app' // Importa a aplicação Fastify que será testada

import supertest from 'supertest' // Importa o supertest para fazer requisições HTTP
import { execSync } from 'node:child_process'

// Antes de cada teste, executa as migrações do Knex para garantir que o banco de dados esteja no estado inicial
describe('transaction routes', () => {
  beforeEach(() => {
    execSync('npm run knext migrate:rollback --all') // Reverte todas as migrações
    execSync('npm run knext migrate:latest') // Aplica todas as migrações
  })

  // Hook para ser executado antes de todos os testes
  beforeAll(async () => {
    await app.ready() // Inicializa a aplicação Fastify antes dos testes
  })

  // Hook para ser executado após todos os testes
  afterAll(async () => {
    await app.close() // Fecha a aplicação Fastify após os testes
  })

  // Teste para verificar se um usuário pode criar uma nova transação
  it('should be able to create a new transaction', async () => {
    await supertest(app.server) // Faz uma requisição HTTP para o servidor Fastify
      .post('/transactions') // Rota para criar uma nova transação
      .send({
        // Corpo da requisição contendo os dados da transação
        name: 'new Transaction', // Nome da transação
        amount: 900, // Valor da transação
        type: 'credit', // Tipo da transação
      })
      .expect(201) // Espera que o servidor responda com status 201 (Created)
  })

  // Teste para verificar se todas as transações podem ser listadas corretamente
  it('should be able to list all transactions', async () => {
    // Cria uma nova transação para garantir que haja pelo menos uma transação na lista
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        name: 'new Transaction',
        amount: 900,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    // Obtém a lista de todas as transações
    const listTransactionsResponse = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    // Verifica se a lista de transações contém pelo menos uma transação com os dados corretos
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        name: 'new Transaction',
        amount: 900,
      }),
    ])
  })

  // Teste para verificar se é possível obter um resumo das transações
  it('should be able to get the summary', async () => {
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        name: 'Credit Transaction',
        amount: 5000,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    await supertest(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        name: 'Debit Transaction',

        amount: 2000,
        type: 'debit',
      })

    // Obtenha o resumo de todas as transações
    const summaryResponse = await supertest(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    // Verifique se os detalhes do resumo correspondem aos esperados
    expect(summaryResponse.body.summary).toEqual(
      expect.objectContaining({
        amount: 3000, // Valor esperado para a chave 'amount'
      }),
    )
  })

  // Teste para verificar se é possível obter uma transação específica
  it('should be able to get an specific transaction', async () => {
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        name: 'new Transaction',
        amount: 900,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    // Obtenha a lista de todas as transações
    const listTransactionsResponse = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    // Verifique se há pelo menos uma transação na lista
    expect(listTransactionsResponse.body.transactions).toHaveLength(1)

    // Obtenha o ID da primeira transação na lista
    const transactionId = listTransactionsResponse.body.transactions[0].id

    // Faça uma requisição para obter os detalhes dessa transação específica usando o ID obtido
    const getTransactionResponse = await supertest(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    // Verifique se os detalhes da transação correspondem aos esperados
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        name: 'new Transaction',
        amount: 900,
      }),
    )
  })
})
