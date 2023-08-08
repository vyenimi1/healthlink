import axios from 'axios';

let headers = {};

const axiosInstance = axios.create({
    headers,
});

export default axiosInstance;