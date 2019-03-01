import Axios from 'axios';
import getSetting from './getSetting';
const BASE_URL = getSetting('REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_KEY') || '//tvm-webatlashar/WAAPI-Bygning/';
const searchKey = getSetting('REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_BASE_URL') || '4fd09bea-7647-427e-9004-1f170763ecbf';
const resource = getSetting('REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_SEARCH') || '/bygninger/byadresse/';


export const buildingApiService ={
    async GetBuilding (address){
        let headers = {Accept: 'application/json; charset=utf-8',
        'X-WAAPI-Token': searchKey
    };
        console.log(BASE_URL);
        let client = createNewClient(headers);
        let res = await client.get(resource+encodeURIComponent(address)+'?IncludeByggAreal='+encodeURIComponent('true')+'&IncludeRosData='+encodeURIComponent('true')+'&IncludeFkbData=false&IncludeMatrikkelData='+encodeURIComponent('true'));
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
