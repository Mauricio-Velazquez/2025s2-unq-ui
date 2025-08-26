import { object, string } from "yup";

export const putPostBodySchema = object({
  image: string().url().required(),
  body: string().required(),
})
  .noUnknown(true)
  .strict();
