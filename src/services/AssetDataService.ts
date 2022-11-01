import http from "@/plugins/axios";
import { GetAssetsRequestData, SearchAssetsRequestData } from "@/types/Asset/RequestData";
import { GetAssetsResponseData } from "@/types/Asset/ResponseData";
import {AxiosResponse} from 'axios';
import AssetJson from '@/assets/assets.json'

class AssetDataService {
  // getAll(): Promise<any> {
  //   return http.get<Asset[]>("/assets");
  // }

//   get(id: any): Promise<any> {
//     return http.get(`/assets/${id}`);
//   }

getAssets(data: GetAssetsRequestData): Promise<AxiosResponse> {
  return http.post<GetAssetsResponseData[]>("/assets", data);
}

searchAssets(data: SearchAssetsRequestData): Promise<AxiosResponse> {
  return http.post<GetAssetsResponseData[]>("/assets/search", data);
}

getAllAssets(page: number, itemsPerPage: number): Promise<AxiosResponse> {
  return http.post<GetAssetsResponseData[]>("/assets", { assets: AssetJson.slice((page - 1) * itemsPerPage, page * itemsPerPage) });
}

getAssetHistory(uuid: string, date: string): Promise<AxiosResponse> {
  return http.get<GetAssetsResponseData[]>(`/assets/${uuid}/history?date=${date}`);
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
