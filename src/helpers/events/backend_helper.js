import { get } from "../api_helper"
import * as url from "./url_helper"

// get events
export const getEvents = () => get(url.GET_EVENTS)
