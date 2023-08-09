import axios from 'axios';
import { endpoints } from './data';

export const getFunctions = async() => {
    try {
        const { data } = await axios.get(endpoints.urlFunctions)
        return data;
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const saveFunction = async(functions) => {
    try {
        const { data } = await axios.post(endpoints.urlFunctions, functions)
        return data;
        
    } catch (error) {
        console.log(error);
        return null
    }
}

export const deleteFunction = async (id) => {
    try {
        const { data } = await axios.delete(`${endpoints.urlFunctions}/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}