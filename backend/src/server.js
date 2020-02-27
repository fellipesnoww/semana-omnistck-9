//Express - microframework que ajuda em definições de rotas
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');


const app = express();
const server = http.Server(app);    //Extrai o servidor http de dentro do Express
const io = socketio(server);        //Passa a ouvir o protocolo websocket

const connectedUsers = {};          //Melhor seria um banco armazenando esses caras

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-dj5de.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Toda vez que o usuario logar na aplicacao o socket tera conhecimento
io.on('connection', socket => {
    //console.log('Usuário Conectado', socket.id);

    //socket.emit('hello', 'World');

    //Lança a mensagem apos determinado tempo
    //setTimeout(() => {socket.emit('hello', 'World')}, 4000);

    //Pode ouvir mensagens tbm
    // socket.on('omni', data => {
    //     console.log(data);
    // });

    //console.log(socket.handshake.query);    //Pega os dados passados na query do front

    //Relaciona o id do usuario com o Id de Conexao
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

//Adiciona funcionalidade em toda a rota, todas as rota terao o io e usuarios conectados 
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next(); //Continua o fluxo 
});

//req - recebe as informações que o usuario envia na request
//res - devolve a resposta
//req.query = Acessar os query params  (para filtros)
//req.params = Acessar route params (para edição)
//req.body = Acessar corpo da requisicao em casos de Post

//Precisa ouvir os protocolos HTTP (Assincronos) e WebSocket (Sincronos)
app.use(cors());
app.use(express.json());  //Faz com que o express compreenda que as requisicoes possuem o body como JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);