import axios from 'axios';

//Lembrar do IP na pagina do Expo
//Casa http://192.168.86.56:3333

const api = axios.create({
    baseURL: "http://10.254.207.47:3333"
});

export default api;