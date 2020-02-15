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
}, {
    //Toda vez que um spot for convertido para JSON, sera calculado o virtual
    toJSON:{
        virtuals: true
    }
});

//Campo que sera criado pelo JavaScript
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
});

//A partir daqui o Mongo reconhece qual é o schema de User
module.exports = mongoose.model('Spot', SpotSchema);