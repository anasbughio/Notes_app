import axios from 'axios';

const instance = axios.create({
    baseURL:'notesapp-production-173d.up.railway.app/api'

});

export default instance;