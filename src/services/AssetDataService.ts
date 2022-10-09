import http from "@/plugins/axios";
import { Asset } from "@/types/Asset";
import RequestData from "@/types/Asset/RequestData";
import ResponseData from "@/types/Asset/ResponseData";
import {AxiosResponse} from 'axios';

class AssetDataService {
  // getAll(): Promise<any> {
  //   return http.get<Asset[]>("/assets");
  // }

//   get(id: any): Promise<any> {
//     return http.get(`/assets/${id}`);
//   }

searchAssets(data: RequestData): Promise<AxiosResponse> {
  return http.post<ResponseData[]>("/assets", data);
}

//   update(id: any, data: any): Promise<any> {
//     return http.put(`/assets/${id}`, data);
//   }

//   delete(id: any): Promise<any> {
//     return http.delete(`/assets/${id}`);
//   }

//   deleteAll(): Promise<any> {
//     return http.delete(`/assets`);
//   }

//   findByTitle(title: string): Promise<any> {
//     return http.get(`/assets?title=${title}`);
//   }
}

export default new AssetDataService;