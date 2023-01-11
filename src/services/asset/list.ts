import http from "@/plugins/axios"
import { Asset } from "@/types/models/Asset"
import { AxiosResponse } from "axios"

interface Request {
    assets: Array<string>
}

const getAssets = async (data: Request): Promise<AxiosResponse<Asset[]>> => {
  return http.post<Asset[]>("/assets", data)
}

export default getAssets