import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/spa';

export const spaServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const spa = Object.values(result);
    
        return spa;
    };
    
    const getOne = async (spaId) => {
        const result = await request.get(`${baseUrl}/${spaId}`);
    
        return result;
    };
    
    const create = async (spaData) => {
        const result = await request.post(baseUrl, spaData);
    
        console.log(result);
    
        return result;
    };
    
    const addComment = async (spaId, data) => {
        const result = await request.post(`${baseUrl}/${spaId}/comments`, data);
    
        return result;
    };

    const edit = (spaId, data) => request.put(`${baseUrl}/${spaId}`, data);

    const deleteSpa = (spaId) => request.delete(`${baseUrl}/${spaId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        addComment,
        delete: deleteSpa,
    };
}