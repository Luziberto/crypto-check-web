import http from "@/plugins/axios"
import { Asset } from "@/types/models/Asset"
import { AxiosResponse } from "axios"

interface Request {
    search: string
}

const searchAssets = (data: Request): Promise<AxiosResponse<Asset[]>> => {
  return http.post<Asset[]>("/assets/search", data)
}

export default searchAssets