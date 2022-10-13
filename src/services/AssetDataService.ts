import http from "@/plugins/axios";
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

getAssets(data: RequestData): Promise<AxiosResponse> {
  return http.post<ResponseData[]>("/assets", data);
}

getAssetHistory(uuid: string, date: Date): Promise<AxiosResponse> {
  return http.get<ResponseData[]>(`/assets/${uuid}/history?date=${date}`);
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