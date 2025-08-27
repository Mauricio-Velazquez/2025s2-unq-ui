import { object, string } from 'yup'

export const putPostBodySchema = object({
  image: string().url().required(),
  description: string().required()
})
  .noUnknown(true)
  .strict()

export const postBodySchema = object({
  image: string().url().trim().required(),
  description: string().required()
})
