import { del, get, post, put } from "../api_helper"
import * as url from "./url_helper"

// // get users
// export const getAllUsers = async page => {
//   console.log(page)
//   const response = await get(page ? page : url.GET_USERS)
//   return response
// }
// get users
export const getAllUsers = page => get(page ? page : url.GET_USERS)
