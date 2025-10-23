import { API_URL } from '../config/constants'
import axios from 'axios'

export function getSearchResults (query) {
  return axios.get(`${API_URL}/search?query=${query}`, { withCredentials: true })
}
