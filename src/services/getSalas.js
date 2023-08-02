import axios from "axios";
import { endpoints } from "./data";


export const getSalas = async() => {
    try {
        const { data } = await axios.get(endpoints.urlSala);
        return data;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}