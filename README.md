<p align="center">
  Integração entre Pipedrive e Pipeline utilizando Node e MongoDB
</p>
<p align="center">
  <img src="flow.PNG">
</p>

### Tecnologias, Bibliotecas e Frameworks utilizadas(os)

* * **Nodejs** : Versão utilizada 12.6.4.
* * **Mongo DB** : Versão utilizada 4.6.
* * **Axios** : Versão utilizada 0.9.12.
* * **Mongoose** : Versão utilizada 5.9.12.
* * **restify** : Versão utilizada 8.5.1.

### Project Setup

#### Mudar Tokens e Chaves da do arquivo environment, presente em 'api/common/environment.js'

```
api_token_pipedrive: 'seu_token',
api_key_bling: 'sua key'

```

#### Clonar ou baixar este repositório, navegue até a pasta com o seu prompt de preferência e rode npm install

```
npm install

```

#### npm start :) Para ver a API trabalhando na porta 4003

```
npm start

```
### Abra o navagador de sua prefertência e faça um get para ver se deu tudo certo. Caso de tudo certo, deverá
retornar as informações do seu browser. Exemplo:

```
{
"browser": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
"method": "GET",
"url": "/",
"path": "/",
"query": {},
"timeout": 120000,
"DateRequest": "07/05/2020",
"HourRequest": "00:25:51",
"serverName": "Pipedrive and Bling integration",
"ipclient": "::1"
}

```
### Features

#### Retornar as oportunidades do pipedrive, cadastra-os na Collection no Mongo DB e insere como pedido no Bling 

```
GET: localhost:4003/opportunities

```
#### Retorna todos os Pedidos Cadastrados no Bling, conforme foram inseridos no Mongo DB

```
GET: localhost:4003/orderblings

```

#### Retorna 1 pedido com o id determinado no Request

```
GET: localhost:4003/orderbling/:id

```
## API Design

* A API foi desenvolvida utilizando o padrão Restful, com o auxílio do Framework Restify.
* Habilitação do CORS na API
* Mapeamento das Schemas dos Documentos com o Mongoose
* Tratamento de erros com o Restify


