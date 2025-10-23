import { toast } from 'react-toastify'

const options = { closeButton: false, closeOnClick: true }

export function toastError (error) {
  let message
  if (Math.floor(error.response?.status / 100) === 5) {
    message = 'Internal server error, please try again later'
  } else {
    message = error.response?.data?.message || error.message
  }
  toast.error(message, options)
}

export function toastSuccess (message) {
  toast.success(message, options)
}
