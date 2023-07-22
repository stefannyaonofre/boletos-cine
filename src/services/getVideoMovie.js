import axios from "axios";
import { endpoints } from "./data";

export const getVideoMovie = async (id) => {

    try {
        const urlVideo = endpoints.urlVideo(id);
        const video = await axios.get(urlVideo);
        return video;

    } catch (error) {
        console.log(error);
        return []
    }
}