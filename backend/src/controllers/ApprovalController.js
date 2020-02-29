const Booking = require('../models/Booking');

module.exports ={
    async store(req, res) {

        //Verificar se é o dono do spot que esta aprovando ou nao

        const {booking_id} = req.params;    //Pega o id do booking vindo por parametro
        const {spot_user_id} = req.headers;      //Pega o usuario vindo no header da requisicao

        const booking = await Booking.findById(booking_id).populate('spot');   //Procura esse booking do parametro e traz o spot vinculado a ele tbm               

        if(booking.spot.user == spot_user_id){
            
            if(booking.approved !== null && booking.approved === true){
                return res.json("Está solicitação já foi aprovada!");
            }

            booking.approved = true;         //Seta VERDADEIRO para o status dessa solicitacao de reserva
            
            await booking.save();

            const bookingUserSocket = req.connectedUsers[booking.user];

            if(bookingUserSocket){
                req.io.to(bookingUserSocket).emit('booking_response', booking);
            }
            
            return res.json(booking);
        }
        else{
            return res.json("Você não possui permissão para isso!");
        }       

    }
};