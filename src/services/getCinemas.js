import axios from "axios";
import { endpoints } from "./data";

export const getCinemas = async() => {
    try {
        const { data } = await axios.get(endpoints.urlCinemas);
        return data;
        
    } catch (error) {
        console.log(error);
        return []
    }
}