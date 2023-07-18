import axios from "axios"
import { endpoints } from "./data";

export const getDetailsMovie = async () => {

    try {
        const id = endpoints.urlMovie(976573);
        const resp = await axios.get(id);
        return resp;
        
    } catch (error) {
        console.log(error)
        return {}
    }
}