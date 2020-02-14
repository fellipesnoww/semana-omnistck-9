const mongoose = require('mongoose');

//Indica o schema do Usuario, estrutura
const UserSchema = new mongoose.Schema({
    email: String,
});

//A partir daqui o Mongo reconhece qual é o schema de User
module.exports = mongoose.model('User', UserSchema);