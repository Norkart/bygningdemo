import Axios from 'axios';
import getSetting from './getSetting';
const BASE_URL = getSetting('REACT_APP_SEARCH_BASE_URL');
const searchKey = getSetting('REACT_APP_SEARCH_API_KEY');
const resource = getSetting('REACT_APP_SEARCH_SEARCH');


export const serchApiService ={

async GetAdress (searchTerm){
        let headers = {Accept: 'application/json; charset=utf-8',
                    'X-WAAPI-Profile': searchKey};
         console.log(BASE_URL);
        let client = createNewClient(headers);
        debugger;
        return client.get(resource+'?Query='+ encodeURIComponent(searchTerm));
    },
   
};
const createNewClient = (headers) => {
    return Axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: headers,
        responseType: 'json'
    });
}


