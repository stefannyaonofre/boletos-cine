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