//Possui
//index = retorna listagem sessao, show = retorna somente uma, store = criar , update = alterar, destroy = excluir
const User = require('../models/User')
module.exports = {
    async store(req, res){
        const {email} = req.body; //Desestruturacao, procura email dentro de body

        let user = await User.findOne({email: email});

        if(!user){
            user = await User.create({email})
        }

        return res.json(user);
    }
};