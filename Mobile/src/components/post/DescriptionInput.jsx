import { StyleSheet, Text, TextInput } from 'react-native'

export function DescriptionInput ({ handleDescription, description, descriptionError }) {
  return (
    <>
      <TextInput
        style={styles.descriptionInput}
        placeholder='Agrega un comentario'
        onChangeText={handleDescription}
        value={description}
      />
      {descriptionError && (
        <Text style={styles.error}>La descripción no puede estar vacía</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  descriptionInput: {
    width: '100%',
    minHeight: 80,
    borderColor: 'rgba(204, 204, 204, 1)',
    borderWidth: 1,
    borderRadius: 8
  },
  error: {
    color: 'red'
  }
})
