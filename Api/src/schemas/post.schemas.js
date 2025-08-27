import { object, string } from 'yup'
import { CONFIG } from '../config/constants.js'

export const postBodySchema = object({
  image: string().url().trim().required(),
  description: string().required()
})

export const commentBodySchema = object({
  body: string().trim().max(CONFIG.COMMENT_MAX_LENGTH).required()
})
