import { get } from "../api_helper"
import * as url from "./url_helper"

// get events
export const getEvents = page => get(page ? page : url.GET_EVENTS)
