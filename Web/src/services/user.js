import { API_URL } from '../config/constants.js'
import axios from 'axios'
import { transformUserTimeline } from './dtos/user.js'

export async function fetchCurrentUser () {
  const res = await axios.get(`${API_URL}/users`, { withCredentials: true })
  return res.data
}

export async function fetchUser (userId) {
  const res = await axios.get(`${API_URL}/users/${userId}`, { withCredentials: true })
  return res.data
}

export async function getUserTimeline () {
  const res = await axios.get(`${API_URL}/users`, {
    withCredentials: true
  })
  return transformUserTimeline(res.data)
}

export function toggleFollow (userId) {
  return axios.put(`${API_URL}/users/${userId}/follow`, {}, { withCredentials: true })
}
