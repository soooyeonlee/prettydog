import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";


//const BASE_URL:string = "http://146.56.148.229/api/";
const BASE_URL:string = "http://prettydog.test/api/";

export interface ResponseDatas {
    status? : number,
    statusText? : string,
    data? : object,
    headers? : object,
    request? : object
};

export default async function service(url:string, method:Method, requestData:Object){
    let res:Object = {};
    let headerObject:AxiosRequestHeaders = {};
    let AxiosConfig:AxiosRequestConfig = {};
    let token:string|null = '';
    if(sessionStorage.getItem('token')){
        token = sessionStorage.getItem('token');
    }
    headerObject = {'Authorization': 'Bearer '+token};
    AxiosConfig.baseURL = BASE_URL;
    AxiosConfig.method = method;
    AxiosConfig.url = url;
    AxiosConfig.params = requestData;
    AxiosConfig.headers = headerObject;
    res = await axios.request(AxiosConfig);
    return res;
};