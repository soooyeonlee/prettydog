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

export default async function service(url:string, method:Method, requestData:any){
    let res:Object = {};
    let headerObject:AxiosRequestHeaders = {};
    let AxiosConfig:AxiosRequestConfig = {};
    let token:string|null = '';
    if(sessionStorage.getItem('token')){
        token = sessionStorage.getItem('token');
    }
    const params = new FormData();
    for(let key in requestData){
        if(!requestData[key]){
            requestData[key] = '';
        }
        params.append(key, requestData[key]);
    }

    headerObject = {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'};
    AxiosConfig.baseURL = BASE_URL;
    AxiosConfig.method = method;
    AxiosConfig.url = url;
    //AxiosConfig.params = requestData;
    AxiosConfig.data = params;
    AxiosConfig.headers = headerObject;
    await axios.request(AxiosConfig)
            .then(function (response){
                res = response;
            })
            .catch(function (error){
                alert("서버에 오류가 발생 했습니다.");
                Object(res).status = -1;
                Object(res).error = error;
            });
    //res = await axios.request(AxiosConfig);
    console.log(res);
    return res;
};