import Axios from "axios";
import getSetting from "./getSetting";

const BASE_URL =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_KEY") ||
  "//www.webatlas.no/WAAPI-BygningStaged";
const resource =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_SEARCH") ||
  "/bygninger/byadresse/";

export const buildingApiService = {
  async GetBuilding(address, key) {
    let headers = {
      Accept: "application/json; charset=utf-8",
      "X-WAAPI-Token": sessionStorage.getItem('apiKey')
    };
    let client = createNewClient(headers);
    try {
      let res = await client.get(
        resource +
          encodeURIComponent(address) +
          "?IncludeByggAreal=" +
          encodeURIComponent("true") +
          "&IncludeRosData=" +
          encodeURIComponent("true") +
          "&IncludeFkbData=false&IncludeMatrikkelData=" +
          encodeURIComponent("true")
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
