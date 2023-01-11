import http from "@/plugins/axios"
import { AssetHistory } from "@/types/models/AssetHistory"
import { AxiosResponse } from "axios"


const getAssetHistory = (uuid: string, date: string): Promise<AxiosResponse<AssetHistory>> => {
  return http.get<AssetHistory>(`/assets/${uuid}/history?date=${date}`)
}

export default getAssetHistory