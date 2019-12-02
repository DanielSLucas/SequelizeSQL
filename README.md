# SequelizeSQL
Introdução a migrations TUTORIAL CRIADO COM BASE NO TUTORIAL NO BLOG DO ROCKETSEAT - https://blog.rocketseat.com.br/nodejs-express-sequelize/


Este repositório se refere a criação de um backend utilizando o node, express, o sequelize e um banco sql.


1º  Passo - iniciando o projeto

  -Abra seu terminal 
  -Crie uma pasta para armazenarmos nosso projeto
      "mkdir NodeSequelize"
  -Entre na pasta do projeto
      "cd NodeSequelize"
  -Agora crie o arquivo package.json dando 'init'
      "npm init" ou "yarn init"
      
2º Passo - instalação das dependências

  *Atenção! Tenha um banco instalado no computador! 
  Neste exemplo estaremos utilizando o MySQL Worckbench (MariaDB) e o rodaremos localmente com o XAMPP.
  
  -No seu terminal instale:
      express: 
          "yarn add express"
      sequelize:
          "yarn add sequelize"
      sequelize-cli:
          "yarn add -D sequelize-cli"
      mysql2:
          "yarn add mysql2"
      body-parser:
          "yarn add body-parser"
    
3º Passo - index.js

  -Crie um arquivo chamado "index.js" na raiz do projeto.
  -insira nele o seguinte conteúdo:
  
    "
      const express = require('express'); //importação do expresse
      const app = express(); //atribuir a chamada da função 'express()' a const 'app'
     
      //rota para teste
      app.get('/', (req,res) => {
          res.send('Olá Mundo!');
      });
     
      app.listen(3333); //porta a qual o servidor vai rodar
    "
   
   -Agora teste o projeto.
      > Salve o arquivo,
      > Execute no terminal: "node index.js"
      > Entre no navegar no endereço: "http://localhost:3333"
   
   -Se tudo correu certo neste momento você deve estar vendo uma tela com a mensagem "Olá Mundo!".
   
4º Passo - configurando o Sequelize
  
  -Primeiro vamos inicar o sequelize no projeto.
    Digite no terminal: "npx sequelize init"
   
  -Com isso devem ser criados no projeto alguns arquivos. ("config", "migrations", "models" e "seeders").
  
  -Vamos entrar na pasta config e alterar o nome do arquivo "config.json" para "database.js". e alterar seu conteúdo para:
    "
      module.exports = {
        username: 'root', //usuário
        password: '',     //senha
        database: 'db_sequelize', //nome do banco que estamos utilizando
        host: '127.0.0.1', 
        dialect: 'mysql', //tipo de banco
      }
    "
    
  *para facilitar a manipulação do banco de dados vamos usar o mySQL workbench
  
  -Agora crie as pastas "database" e "app" na raiz do projeto
  -Agora mova as pastas "migrations" e "seeders" para dentro de "database"
  -Mova a pasta "models" para dentro de "app"
  
  -Agora precisamos configurar o sequelize para encontrar os arquivos nas pastas para onde os movemos.
  -Crie na raiz do projeto o arquivo: ".sequelizerc"
  -Insira esse conteúdo:
    "
      const path = require('path');

      module.exports = {
        'config': path.resolve('config', 'database.js'),
        'models-path': path.resolve('app', 'models'),
        'seeders-path': path.resolve('database', 'seeders'),
        'migrations-path': path.resolve('database', 'migrations'),
      };
    "
    
    ...
  
  
