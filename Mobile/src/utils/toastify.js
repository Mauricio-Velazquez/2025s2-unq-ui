import Toast from 'react-native-toast-message'

export const toastError = (error) => {
  const message = error.response?.data?.message || error.message

  Toast.show({
    type: 'error',
    text1: message || 'Ocurrió un error inesperado'
  })
  console.log('ERROR: ', message)
}

export const toastSuccess = (message) => {
  Toast.show({
    type: 'success',
    text1: message
  })
}
