import axios from "axios";
import { endpoints } from "./data";

export const getVideoMovie = async (id) => {

    try {
        const urlVideo = endpoints.urlVideo(id);
        const { data } = await axios.get(urlVideo);
        console.log(data)
        const video = data.results.find((item) => item.type.toLowerCase().includes('trailer'));
        console.log(video);
        return video;

    } catch (error) {
        console.log(error);
        return null;
    }
}