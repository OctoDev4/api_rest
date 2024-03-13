Gestão de Transações com Fastify e Knex

Este repositório contém um projeto de exemplo para demonstrar a implementação de uma API de gestão de transações usando Fastify e Knex. A API permite aos usuários criar transações, listar todas as transações, obter um resumo das transações e obter detalhes de uma transação específica.
Recursos Principais

    Criação de Transações: Os usuários podem criar novas transações com um nome, valor e tipo (crédito ou débito).
    Listagem de Transações: As transações podem ser listadas para o usuário, mostrando o nome e o valor de cada transação.
    Resumo de Transações: Um resumo total dos valores das transações é disponibilizado para os usuários.
    Detalhes da Transação: Os usuários podem obter detalhes específicos de uma transação com base no seu ID.

Tecnologias Utilizadas

    Fastify: Framework web leve e eficiente para construir APIs em Node.js.
    Knex: Um construtor de consultas SQL para Node.js, que permite uma interface simples para interagir com o banco de dados.
    Zod: Uma biblioteca de validação de esquema para TypeScript e JavaScript.
    Vitest: Uma biblioteca de testes para escrever testes em estilo BDD (Behavior-Driven Development) em JavaScript ou TypeScript.

Como Usar

    Clone este repositório em sua máquina local.
    Instale as dependências usando npm install.
    Execute as migrações do Knex para configurar o banco de dados usando npm run knext -- migrate:latest.
    Inicie o servidor usando npm run start.
    Execute os teste com npm run test
    Explore a API e seus endpoints para gerenciar transações.

Este projeto é uma ótima referência para quem está aprendendo a construir APIs com Fastify e Knex, e pode ser facilmente estendido com novos recursos e funcionalidades.
