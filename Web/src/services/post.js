import { API_URL } from '../config/constants.js'
import { transformPost } from './dtos/user.js'
import axios from 'axios'

const getPost = async (postId) => {
  const response = await axios.get(`${API_URL}/posts/${postId}`, {
    withCredentials: true
  })
  return transformPost(response.data)
}
const postComment = async (idPost, commentDTO, navigate) => {
  const res = await axios.post(`${API_URL}/posts/${idPost}/comment`, commentDTO, { withCredentials: true })
  return res.data
}
const deletePost = async (postId, navigate) => {
  await axios.delete(`${API_URL}/posts/${postId}`, { withCredentials: true })
}
const putPostLike = async (postId, navigate) => {
  const res = await axios.put(`${API_URL}/posts/${postId}/like`, null, { withCredentials: true })
  return res.data
}
const postNewPost = async (newPost, navigate) => {
  const res = await axios.post(`${API_URL}/posts`, newPost, { withCredentials: true })
  return res.data
}
const putPost = async (id, post, navigate) => {
  const res = await axios.put(`${API_URL}/posts/${id}`, post, { withCredentials: true })
  return res.data
}
export { putPost, postNewPost, putPostLike, deletePost, postComment, getPost }

export function toggleLike (postId) {
  return axios.put(`${API_URL}/posts/${postId}/like`, {}, { withCredentials: true })
}
