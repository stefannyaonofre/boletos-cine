import axios from "axios";
import { endpoints } from "./data";

export const getAdmin = async() => {
    try {
        const { data } = await axios.get(endpoints.urlAdmin);
        return data;
        
    } catch (error) {
        console.log(error);
        return []
    }
}