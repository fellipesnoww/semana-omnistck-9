const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination:path.resolve(__dirname, '..','..', 'uploads'),  //troca para as barras padroes do S.O e a __dirname pega qual é a pasta atual
        filename: (req, file, cb) =>{
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),//como o multer vai salvar os arquivos da aplicacao
};