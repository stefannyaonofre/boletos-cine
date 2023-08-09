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

export const saveCinema = async(cinema) => {
    try {
        const { data } = await axios.post(endpoints.urlCinemas, cinema)
        return data;
        
    } catch (error) {
        console.log(error);
        return null
    }
}