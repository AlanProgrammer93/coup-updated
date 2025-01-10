import axios from 'axios';

// http://localhost:5000/api
const clientAxios = axios.create({
    baseURL: 'https://coup-updated.onrender.com/api'
});

export default clientAxios;