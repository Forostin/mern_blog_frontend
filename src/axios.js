import axios from 'axios';

const instans = axios.create({
    baseURL : 'http://localhost:3002'
})

export default instans;

