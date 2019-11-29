const express = require('express'); //importação do expresse
const app = express(); //atribuir a chamada da função 'express()' a const 'app'
const BodyParser = require('body-parser');
const jsonParser = BodyParser.json;
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

//importar model
const { User } = require('./app/models');

//app.use(express.urlencoded({ extended: false }));//Modo de recebimento de dados 

//Criação de um usuário
// User.create({name: 'Daniel', email: 'daniellucas-pms@hotmail.com', password: '1234'});


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html'); 
});

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



//Rota '/'
// app.get('/', (req,res) => {
//     res.sendFile(__dirname, '/index.html');
// });


app.listen(3333); //porta da web que o servidor vai rodar