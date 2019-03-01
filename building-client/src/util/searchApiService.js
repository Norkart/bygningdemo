import Axios from 'axios';
import getSetting from './getSetting';
const BASE_URL = getSetting('REACT_APP_SEARCH_BASE_URL') || '//www.webatlas.no/WAAPI-FritekstSok/';
const searchKey = getSetting('REACT_APP_SEARCH_API_KEY') || '4fd09bea-7647-427e-9004-1f170763ecbf';
const resource = getSetting('REACT_APP_SEARCH_SEARCH') || 'search/matrikkel/adresse/gateadresse';


export const serchApiService ={

async GetAdress (searchTerm){
        let headers = {Accept: 'application/json; charset=utf-8',
        'X-WAAPI-Token': searchKey
    };
        console.log(BASE_URL);
        let client = createNewClient(headers);
        
        let res = await client.get(resource+'?Query='+ encodeURIComponent(searchTerm));
        return res;
    },
    async GetBuilding (address){
        let headers = {Accept: 'application/json; charset=utf-8',
        'X-WAAPI-Token': searchKey
    };
        console.log(BASE_URL);
        let client = createNewClient(headers);
        let res = await client.get(resource+'?Query='+ encodeURIComponent(address));
        return res;
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


