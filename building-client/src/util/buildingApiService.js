import Axios from "axios";
import getSetting from "./getSetting";

const BASE_URL =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_KEY") ||
  "//www.webatlas.no/WAAPI-BygningStaged";
const resource =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_SEARCH") ||
  "/bygninger/byadresse/";
const matrikkelResource = "/bygninger/bymatrikkelenhet/";
export const buildingApiService = {
  async GetBuilding(address, params) {
    let headers = {
      Accept: "application/json; charset=utf-8",
      "X-WAAPI-Token": sessionStorage.getItem("apiKey")
    };
    let client = createNewClient(headers);
    try {
      let base = resource + encodeURIComponent(address);
      console.log(params);
      let url = params
        ? base + params
        : base +
          "?IncludeByggAreal=" +
          encodeURIComponent("true") +
          "&IncludeRosData=" +
          encodeURIComponent("true") +
          "&IncludeFkbData=" +
          encodeURIComponent("false") +
          "&IncludeMatrikkelData=" +
          encodeURIComponent("true");
      let res = await client.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async GetByGeom(wktGeom) {
    let headers = {
      Accept: "application/json; charset=utf-8",
      "X-WAAPI-Token": sessionStorage.getItem("apiKey")
    };
    let client = createNewClient(headers);
    try {
      let obj = {
        Geometry: wktGeom,
        IncludeBygningStatuser: false,
        IncludeEtasjer: false,
        IncludeMatrikkelData: true,
        IncludeFkbData: false,
        GeometryTextFormat: "WKT",
        SRS: "4326"
      };
      let res = await client.post("/bygninger/bygeometry", obj);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
};

const createNewClient = headers => {
  return Axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: headers,
    responseType: "json"
  });
};
