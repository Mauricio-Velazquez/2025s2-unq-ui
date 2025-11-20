import { Image, StyleSheet, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import LoadingIcon from '../LoadingIcon'

export function ImageViewer ({ image, handleImageError, isValidURL }) {
  const [debouncedImage, setDebouncedImage] = useState(image)
  const [isValid, setIsValid] = useState(true)
  const [loading, setLoading] = useState(false)

  const initialURL = useCallback(() => image, [])
  const isImageValid = useCallback(imageURL => isValidURL(imageURL), [])
  const stableHandleError = useCallback(handleImageError, [])

  useEffect(() => {
    if (!isImageValid(image)) {
      setIsValid(false)
      return
    }

    const timeout = setTimeout(() => {
      setIsValid(true)
      setDebouncedImage(image)
      setLoading(true) // ⬅️ empieza la carga
    }, 1000)

    return () => clearTimeout(timeout)
  }, [image, isImageValid])

  if (!isValid) {
    return (
      <View style={styles.placeholder}>
        <Image source={require('../../assets/AddPhoto.png')} />
        <Text>Agregar Imagen</Text>
      </View>
    )
  }

  return (
    <View style={styles.imageContainer}>

      {loading && initialURL() !== image && (<LoadingIcon />)}

      <Image
        source={{ uri: debouncedImage }}
        style={styles.image}
        onError={() => {
          setIsValid(false)
          setLoading(false)
          stableHandleError(true)
        }}
        onLoad={() => {
          setLoading(false)
          stableHandleError(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    position: 'relative'
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4
  },
  placeholder: {
    flex: 1,
    minHeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  }
})
