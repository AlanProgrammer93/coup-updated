import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export default clientAxios;