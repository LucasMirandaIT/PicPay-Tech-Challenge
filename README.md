# **Desafio Frontend PicPay**

Avaliador, seja bem-vindo ao meu desafio Frontend PicPay. 
Espero que tenha uma boa navegação pelo sistema, para seu conforto fiz algumas alterações, então após instalar as dependências do projeto utilizando **npm install**, apenas execute **npm start** e já será executado o Front-End e a API utilizando JSON-Server.

## Setup do projeto

- React: v18

## Como Rodar?

- Instale as dependências usando o comando `npm install`
- Na raiz do repositório, rode este comando `npm start` para iniciar o servidor de desenvolvimento.
- A Aplicação estará disponível na porta `http://localhost:3000/`

<br/>


### **API**

Para o seu desafio ser mais interativo, estamos utilizando um mock de API, chamado JSON Server. Portanto, é necessário que você instale-o globalmente em sua máquina para ter os recursos da lib.

**1 -** Como instalar? <br/>
`npm install -g json-server`


Link para mais detalhes: https://github.com/typicode/json-server

**Rotas:** <br />
`GET: /tasks`<br />
`POST: /tasks`<br />
`PUT: /tasks`<br />
`PATCH: /tasks`<br />
`DELETE: /tasks`<br />

`GET: /account` <br />
`POST: /account` <br />
`PUT: /account` <br />
`PATCH: /account` <br />
`DELETE: /account` <br />
<br/>

### **Models**:<br />

Tasks - Esta é sua lista com agenda de pagamentos. Aqui você cadastrar, editar e excluir um pagamento.<br />
` { "id": 5, "name": "Anthea Pundy", "username": "apundy4", "title": "Software Engineer III", "value": 177.19, "date": "2021-01-01T14:09:51Z", "image": "https://robohash.org/quiaautomnis.png?size=150x150&set=set1", "isPayed": true },`

Account - você usará este usuário para Login da plataforma<br />
`{ "id": 0, "name": "usuario", "email": "usuario@gmail.com", "password": "usuario" }`

<br/>

### **Parametros da API (Json Server):**

paginate:<br />
`GET: /tasks?_page=7` <br />
`GET: /tasks?_page=7&_limit=20`

**Usuário para utilizar no login:**<br />
` "email": "usuario@gmail.com", "password": "usuario"`
<br/>
<br/>

**Orientações e dicas:**

- Esperamos que você consiga completar o mínimo do desafio; Mas não se esqueça, que aqui no PicPay é muito concorrido, então você irá concorrer com outras pessoas desenvolvedoras que também querem muito trabalhar conosco, então, arrebenta, mostre o seu melhor! 😉

- Iremos avaliar cada feature, conceito, pattern, tudo o que você fizer de adicional. Tudo além do proposta contará pontos!

- Caso você esteja concorrendo a uma vaga de Sênior, testes unitários são necessários no teste. Se você estiver concorrendo a uma vaga de JR ou Pleno, não é obrigatorio, mas é um grande diferencial caso seja aplicado os testes.

- Faça commits regulares. Eles são melhores do que um commit gigantesco. Gostaríamos de ver commits organizados e padronizados, então capriche neles!
