const mongoose = require('mongoose');

//Indica o schema do Usuario, estrutura
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,   //Referencia de usuario no schema User,
        ref: 'User'
    }
});

//A partir daqui o Mongo reconhece qual é o schema de User
module.exports = mongoose.model('Spot', SpotSchema);