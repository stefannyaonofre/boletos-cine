import axios from "axios";
import { endpoints } from "./data";

export const getMovies = async () => {

    try {
        const { data } = await axios.get(endpoints.urlMovies);
        return data.results;

    } catch (error) {
        console.log(error);
        return [];
    }

}