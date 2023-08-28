import axios from "axios"
import { get } from "../api_helper"
import * as url from "./url_helper"

// get events
export const getEvents = page => get(page ? page : url.GET_EVENTS)

// get events categories
export const getEventCategories = () =>
  axios
    .get("http://digimonk.live:2301/api/v1/events/categories/")
    .then(response => response.data)
