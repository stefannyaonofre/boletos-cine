import axios from "axios";
import { endpoints } from "./data";

export const getTicket = async() => {
    try {
        const { data } = await axios.get(endpoints.urlTickect);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const saveTicket = async(ticket) =>{
    try {

        const { data } = await axios.post(endpoints.urlTickect, {...ticket});
        return data;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}
