import axios from 'axios';

//Lembrar do IP na pagina do Expo
const api = axios.create({
    baseURL: "http://192.168.86.56:3333"
});

export default api;