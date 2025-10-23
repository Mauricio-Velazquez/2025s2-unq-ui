import axios from 'axios'
import { API_URL } from '../config/constants.js'

export async function registerUser (registerUserDto) {
  return await axios.post(`${API_URL}/register`, registerUserDto, { withCredentials: true })
}

export async function loginUser (loginUserDTO) {
  return await axios.post(`${API_URL}/login`, loginUserDTO, { withCredentials: true })
}

export function logout () {
  return axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
}
