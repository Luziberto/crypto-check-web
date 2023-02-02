import http from "@/plugins/axios"
import { Asset } from "@/types/models/Asset"
import { AxiosResponse } from "axios"

interface Request {
  search: string,
  page: number
  perPage: number
}

interface Response {
  data: Asset[],
  total: number,
  current_page: number
  last_page: number
}

const getAssets = async (data: Request): Promise<AxiosResponse<Response>> => {
  return http.post<Response>(`/assets?page=${data.page}`, { search: data.search, per_page: data.perPage})
}

export default getAssets