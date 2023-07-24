import axios from "axios"
import { endpoints } from "./data";

export const getDetailsMovie = async (id) => {

    try {
        const url = endpoints.urlMovie(id);
        const {data} = await axios.get(url);
        const newMovie = {
            id: data.id,
            name: data.title,
            nameEnglish: data.original_title,
            image: `${endpoints.urlImage}${data.backdrop_path}`,
            premiere: data.release_date,
            runtime: data.runtime,
            adult: data.adult,
            gender: data.genres.map(item => item.name),
            overview: data.overview
        }
        return newMovie;
        
    } catch (error) {
        console.log(error)
        return {}
    }
}