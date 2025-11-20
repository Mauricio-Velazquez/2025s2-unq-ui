import { API_URL } from '../config/constants'
import axios from 'axios'

export async function getSearchResults (query) {
  const res = await axios.get(`${API_URL}/search?query=${query}`, { withCredentials: true })
  return res.data
}

// transforma un usuario a un formato simple
export function transformUserSimple (u) {
  return {
    id: u.id,
    name: u.name,
    image: u.image
  }
}

// transforma un post
export function transformPost (p) {
  return {
    id: p.id,
    description: p.description,
    image: p.image
  }
}
