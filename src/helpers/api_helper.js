import axios from "axios"
// import accessToken from "./jwt-token-access/accessToken"
import Authorization from "./jwt-token-access/auth-token-header"

//pass new generated access token here
// console.log(Authorization(), "authadsf")
const token = Authorization()

//apply base url for axios
const API_URL = "http://digimonk.live:2301/api/v1/admin"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then(response => {
    return response.data.data
  })
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
export default API_URL
