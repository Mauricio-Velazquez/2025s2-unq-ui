import pkg from 'yup';
const { object, string, required, min, max } = pkg;

export const userSchema = object({
    name: string().min(2).max(100).required(),
    email: string().email().required(),
    password: string().min(6).required(),
    image: string().url().required()
});