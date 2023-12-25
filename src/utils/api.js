import axios from "axios";

export const fetchDataFromApi = async (url) => {
    console.log('fetchDatafromApi')
    try {
        const {data} = await axios.get(
            import.meta.env.VITE_BASE_URL + url, 
        );
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

