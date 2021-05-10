## Comando obrigatório
## Baixa a imagem do node com versão alpine (versão mais simplificada e leve)
FROM node:lts

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que você quiser
WORKDIR /usr/desafio-wa-api

## Copia tudo que começa com package e termina com .json para dentro da pasta /usr/app
COPY package*.json ./

## Executa npm install para adicionar as dependências e criar a pasta node_modules
RUN npm install

## Copia tudo que está no diretório onde o arquivo Dockerfile está
## para dentro da pasta /usr/desafio-wa-api do container
## Vamos ignorar a node_modules por isso criaremos um .dockerignore
COPY . .

## Container ficará ouvindo os acessos na porta 3000
EXPOSE 3333:3333

## Não se repete no Dockerfile
## Executa o comando npm start para iniciar o script que que está no package.json
RUN npm run typeorm migration:run
CMD npm run dev:server
