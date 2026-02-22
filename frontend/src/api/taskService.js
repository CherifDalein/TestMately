import axios from 'axios';

const API = axios.create({
    baseURL: 'http://192.168.56.1:3000/api/tasks',
    timeout: 5000,
});

export const taskService = {
    getTasks: async (after) => {
        const response = await API.get('/', {params: {after}});
        return response.data;
    },
    simulate: async () => {
        return await API.post('/simulate');
    }
}
