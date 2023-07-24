import axios from "axios";


const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "en", gl: "US",
    // maxResults: "50" 
},
    headers: {
        "X-RapidAPI-Key":
       '95fb15b2edmshf0c6934e0535089p10d8a3jsnd61b9f57fd7b',
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};

