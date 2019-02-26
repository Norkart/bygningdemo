import Axios from 'axios';

const BASE_URL = process.env.REACT_APP_SEARCH_BASE_URL;
const searchKey = process.env.REACT_APP_SEARCH_API_KEY;
const resource = process.env.REACT_APP_SEARCH_SEARCH;


export const service ={
    async GetAdress(searchTerm){
        let headers = {Accept: 'application/json; charset=utf-8',
                    'X-WAAPI-Profile': searchKey};
         
        let client = this.createNewClient(headers);
        return client.get(resource);
    },
};



const createNewClient = headers => {
    return Axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: headers,
        responseType: 'json'
    });
};