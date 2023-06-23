import { del, get, post, put } from "../api_helper"
import * as url from "./url_helper"

// get users
export const getAllUsers = page => get(page ? page : url.GET_USERS)
// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// update user
export const updateUsers = user => put(`${url.UPDATE_USER}/${user.id}`,user)

// get user details
export const getUserDetail = id => get(`${url.GET_USERS_DETAILS}/${id}`)

// delete user 
export const deleteUsers = id => del(`${url.DELETE_USER}/${id}`)
