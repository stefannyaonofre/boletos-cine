import axios from "axios";
import { endpoints } from "./data";

export const getAdmin = async(formData) => {
    try {
        const { data } = await axios.get(endpoints.urlAdmin);
        const loggedUser = data.find(
            (admin) =>
              admin.user === formData.name && admin.password === formData.password
          );
          return loggedUser;
        
    } catch (error) {
        console.log(error);
        return null
    }
}