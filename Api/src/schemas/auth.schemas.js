import { object, string } from 'yup'

export const registerSchema = object({
  name: string().trim().required(),
  email: string().email().trim().required(),
  password: string().required(),
  image: string().url().required()
}).noUnknown(true).strict()

export const loginSchema = object({
  email: string().email().trim().required(),
  password: string().required()
}).noUnknown(true).strict()
