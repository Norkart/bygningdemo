import Axios from "axios";
import getSetting from "./getSetting";

const BASE_URL =
  getSetting("REACT_APP_SEARCH_BASE_URL") ||
  "//www.webatlas.no/WAAPI-FritekstSok/";
const resource =
  getSetting("REACT_APP_SEARCH_SEARCH") ||
  "search/matrikkel/adresse/gateadresse";

export const serchApiService = {
  async GetAdress(searchTerm) {
    let headers = {
      Accept: "application/json; charset=utf-8",
      "X-WAAPI-Token": sessionStorage.getItem('apiKey')
    };
    
    let client = createNewClient(headers);
    try {
      let res = await client.get(
        resource + "?Query=" + encodeURIComponent(searchTerm)
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
};

const createNewClient = headers => {
  return Axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: headers,
    responseType: "json"
  });
};
