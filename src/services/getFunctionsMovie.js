import axios from "axios";
import { endpoints } from "./data";

export const getFunctiosMovie = async (idPelicula, idCinema) => {
    try {
        const url = endpoints.ulrFunctionsCinema(idPelicula, idCinema);
        const { data } = await axios.get(url);
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}