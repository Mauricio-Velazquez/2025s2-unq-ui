import axios from 'axios'
import { API_URL } from '../config/constants'

export async function fetchUser (userId) {
  const res = await axios.get(`${API_URL}/users/${userId}`, { withCredentials: true })
  res.data.posts.reverse()
  return res.data
}

export async function getUserTimeline () {
  const res = await axios.get(`${API_URL}/users`, {
    withCredentials: true
  })
  return res.data
}

export async function toggleFollow (userId) {
  const res = await axios.put(`${API_URL}/users/${userId}/follow`, {}, { withCredentials: true })
  res.data.posts.reverse()
  return res.data
}
