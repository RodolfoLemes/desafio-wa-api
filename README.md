# Instruções

## Desenvolvimento

- Crie o arquivo `.env`, utilizando como referência o arquivo `.env.example`: `cp .env.example .env`;
- Informe no arquivo `.env` as variáveis de ambiente, como credenciais, acesso de banco de dados, secrets, etc;
- Inicie um banco de dados postgresql;
- Execute:

```bash
yarn                         ## install
yarn typeorm migration:run   ## run migration
yarn dev:server              ## start dev server
```

- Outra alternativa é utilizar o `Docker` e o `docker-compose`, usando o comando:

```bash
docker-compose up -d
```

## Produção

- Crie o arquivo `.env`, utilizando como referência o arquivo `.env.example`: `cp .env.example .env`;
- Informe no arquivo `.env` as variáveis do ambiente de produção. IMPORTANTE: você precisa alterar as variáveis
  do TypeORM para usar o diretório de produção, substituindo `src` por `dist` e `*.ts` por `*.js`;
- Inicie um banco de dados postgresql;
- Execute:

```bash
yarn                         ## install
yarn build                   ## build with babel and webpack
yarn typeorm migration:run   ## run migrations
yarn start                   ## start server
```

## Banco de Dados

- Adicione as configurações nas variáveis de ambiente do seu banco de dados. De preferência, utilizado PostgreSQL, pois foi desenvolvido nele a API:
  - `TYPEORM_CONNECTION`;
  - `TYPEORM_HOST`;
  - `TYPEORM_USERNAME`;
  - `TYPEORM_PASSWORD`;
  - `TYPEORM_DATABASE`;
  - `TYPEORM_PORT`.

# Documentação da API

- [RESTful API Reference (insomnia)](docs/insomnia.json)

# Diagrama do Banco de dados

- [Diagrama](assets/dbdiagram.png)
