import axios from 'axios';

const api = axios.create({
    //IP da máquina com base no servidor Expo
    baseURL: 'http://192.168.0.108:3333'
});

export default api;