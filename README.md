<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h4 align="center">
  Repositório voltado para o desenvolvimento do bootcamp GoStack realizado pela <a href="https://rocketseat.com.br/gostack">RocketSeat</a>
</h4>

<blockquote align="center">“Stay hungry, stay foolish”</blockquote>
<blockquote align="center">- Steve Jobs</blockquote>


### Sobre o Bootcamp

Treinamento imersivo nas tecnologias **NodeJS**, **React**, **React Native**, onde mantenho todo o ambiente de desenvolvimento e a aplicação executando no **Docker**

#### Módulos:
Com o decorrer do Bootcamp eu irei atualizando os módulos concluídos
<ul style="list-style-type:none;">
    <li>
        <input type="checkbox" id="scales" name="scales"
         checked>
        <label for="scales">Ambientes e Dicas</label>
    </li>
    <li>
        <input type="checkbox" id="scales" name="scales"
         checked>
        <label for="scales">Ambiente e Conceitos</label>
        <ul>
            <li>Conceitos</li>
            <li>Introdução ao Node</li>
            <li><a href="https://github.com/victorvf/goStack-desafio01">Desafio 01</a></li>
        </ul>
    </li>
    <li>
        <input type="checkbox" id="scales" name="scales"
         checked>
        <label for="scales">Iniciando back-end do GoBarber</label>
        <ul style="list-style-type:none;">
            <li>
                <input type="checkbox" id="scales" name="scales"
                checked>
                <label for="scales">Ambiente e Conceitos</label>
            </li>
            <li>
                <input type="checkbox" id="scales" name="scales">
                <label for="scales">Cadastro e autenticação de usuários</label>
            </li>
            <li>
                <input type="checkbox" id="scales" name="scales">
                <label for="scales">Desafio 02</label>
            </li>
        </ul>
    </li>
</ul>

#### Docker:
- Dockerfile
```
FROM node:alpine

RUN mkdir /app
WORKDIR /app

RUN yarn init --yes

COPY ./desafioOne /app
RUN yarn install

EXPOSE 3000
```
- docker-compose.yml
```
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./goBarber/postgres:/var/lib/postgres/data
    ports:
      - "5432:5432"
    environments:
      POSTGRES_PASSWORD: password
  node:
    build: .
    image: desafio01:latest
    command: yarn dev
    volumes:
      -  ./desafioOne:/app/
    ports:
      - "3000:3000"
    depends_on:
      - db
```
