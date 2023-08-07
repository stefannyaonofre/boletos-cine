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
        
    } catch (error) {
        console.log(error);
        return null
    }
}