import axios from 'axios'
import { API_URL } from '../config/constants.js'

export async function registerUser (registerUserDto) {
  const res = await axios.post(`${API_URL}/register`, registerUserDto, { withCredentials: true })
  return res.data
}

export async function loginUser (loginUserDTO) {
  const res = await axios.post(`${API_URL}/login`, loginUserDTO, { withCredentials: true })
  res.data.posts.reverse()
  return res.data
}

export function logout () {
  const res = axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
  return res.data
}
