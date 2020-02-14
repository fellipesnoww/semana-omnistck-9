const mongoose = require('mongoose');

//Indica o schema do Usuario, estrutura
const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,   //Referencia de usuario no schema User,
        ref: 'User'
    },
    spot:{
        type: mongoose.Schema.Types.ObjectId,   //Referencia de spot no schema Spot,
        ref: 'Spot'
    }
});


module.exports = mongoose.model('Booking', BookingSchema);