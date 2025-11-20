import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { postNewPost } from '../../services/post'
import { usePostForm } from '../../hooks/usePostForm'
import { DescriptionInput } from './DescriptionInput'
import { ImageViewer } from './ImageViewer'

export default function PostForm ({ initialURL = '', initialDescription = '', postAction = postNewPost }) {
  const {
    image,
    description,
    imageError,
    descriptionError,
    handleUrl,
    handleDescription,
    handleImageError,
    handleSubmit,
    isValidURL
  } = usePostForm(initialURL, initialDescription, postAction)

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.imageURLInput}
        placeholder='Imagen'
        onChangeText={handleUrl}
        value={image}
      />
      <ImageViewer isValidURL={isValidURL} image={image} imageError={imageError} handleImageError={handleImageError} />
      <DescriptionInput
        handleDescription={handleDescription} description={description}
        descriptionError={descriptionError}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </Pressable>
      {imageError && <Text style={styles.error}>La URL es inválida</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
    gap: 8
  },
  imageURLInput: {
    width: '100%',
    minHeight: 45,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8
  },
  button: {
    justifyContent: 'center',
    minHeight: 45,
    alignItems: 'center',
    backgroundColor: '#495df9b3',
    borderRadius: 8
  },
  buttonText: {
    color: '#fff'
  },
  error: {
    color: 'red'
  }
})
