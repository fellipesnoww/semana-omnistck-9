//Express - microframework que ajuda em definições de rotas
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-dj5de.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//req - recebe as informações que o usuario envia na request
//res - devolve a resposta
//req.query = Acessar os query params  (para filtros)
//req.params = Acessar route params (para edição)
//req.body = Acessar corpo da requisicao em casos de Post

app.use(cors());
app.use(express.json());  //Faz com que o express compreenda que as requisicoes possuem o body como JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);