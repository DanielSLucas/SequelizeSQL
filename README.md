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
    
    
  -Altere o arquivo "app/models/index.js" para:
    "
      const fs = require('fs');
      const path = require('path');
      const Sequelize = require('sequelize');
      const config = require('../../config/database.js');

      const db = {};
      const sequelize = new Sequelize(config);

      fs
        .readdirSync(__dirname)
        .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
        .forEach((file) => {
          const model = sequelize.import(path.join(__dirname, file));
          db[model.name] = model;
        });

      Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });

      db.sequelize = sequelize;
      db.Sequelize = Sequelize;

      module.exports = db;
    "
    
5º Passo - primeira migration 

  *Migrations são arquivos guardam as versões da base de dados. Toda vez que houver uma alteração no banco,
  uma nova migration deve ser criada.
  
  -No nosso caso vamos criar uma tabela de usuários, então vamos criar uma nova migration.
  -Para criar uma nova migration execute no terminal:
    "npx sequelize mitration:create --name=create-users"
   
  -Com esse comando executado, um arquivo deve ter sido criado na sua pasta "migrations"
  -Altere o arquivo para ficar dessa maneira:
  "
    'use strict';

    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', { 

          id: {  //Coluna ID
            allowNull: false, //não nula
            autoIncrement: true, //autoincremental
            primaryKey: true, // É uma PK
            type: Sequelize.INTEGER //é uma string
          },

          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },

          email: {
            allowNull: false,
            type: Sequelize.STRING,
          },

          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },

          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },

        });   
      },

      down: (queryInterface, Sequelize) => {

          return queryInterface.dropTable('users');

      }
    };

  "
  -Agora vamos executar a migration. Execute:
    "npx sequelize db:migrate"
  -Verifique em seu banco se as tabelas "SequelizeMeta" e "Users" foram criadas.
  
6º Passo - primeiro model
  -Dentro da pasta models crie o arquivo "user.js"
    "
      module.exports = (sequelize, DataTypes) => {
        const User = sequelize.define('User', {
          name: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING,
        });

        return User;
      }
    "
7º Passo - inserção de um usuário

  -Agora vamos testar se tudo está funcionando inserindo um usuário na tabela "users"
  -No arquivo "index.js" presente na raiz do projeto, importe o model "user" no topo do arquivo:
    "const { User } = require('./app/models');"
  
  -Adicione as linhas de configuração do body-parser:
    "
      cosnt bodyParser = require('body-parser');
      cosnt jsonParser = bodyParser.json();
      cosnt urlencodedParser = bodyParser.urlencoded({ extended: false });
    "
    
  -Abaixo dessas linhas vamos usar um comando do model para criarmos um usuário:
    "
      User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });
    "
  -Salve o arquivo e execute "node index.js" e se tudo estiver certo um usuário será adicionado a tabela users! =)
  
 8º Passo - Criação do CRUD
  -agora no mesmo arquivo "index.js" vamos criar as rotas de criar, alterar, ler e deletar.
  
  "
    //CRIAR
    app.post('/register', async (req, res) => {
        const user = await User.create(req.body);
        res.json(user);
    }); 

    //LISTAR TODOS
    app.get('/list', async (req, res) => {
        const users = await User.findAll();

        res.send(users);
    });


    //BUSCA
    app.get('/users/:id', async (req, res) => {
        const user = await User.findAll({
            where: {
                id: req.params.id,
            }
        })
        res.send(user);
    });


    //UPDATE
    app.put('/users/:id/att', async (req, res) => {
        await User.update(
            {
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password,
            }, { 
                where: {
                    id: req.params.id,
                }
            }
        ) 
        res.json({message: 'Usuário atualizado'});
    });


    //DELETE
    app.delete('/users/:id/delete', async (req, res) => {
        await User.destroy({
            where:{
                id: req.params.id,
            }
        });

        res.json({message: 'Usuário deletado'});
    });
  "
  

FIM!!!
