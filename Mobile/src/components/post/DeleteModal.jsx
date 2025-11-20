import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function DeleteModal ({ handleIsDeleted, handleDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.texts}>
          <Text style={styles.title}>Eliminar Posteo</Text>
          <Text style={styles.message}>estas seguro de que deseas eliminar este post?</Text>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.cancelar} onPress={() => handleIsDeleted(false)}>
            <Text style={styles.cancelarText}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.delete} onPress={() => handleDelete()}>
            <Text style={styles.deleteText}>Borrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#232425'
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8
  },
  texts: {
    gap: 8,
    marginBottom: 16
  },
  title: {
    fontWeight: 600,
    fontSize: 16
  },
  message: {
    fontWeight: 500
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16
  },
  cancelar: {
    padding: 6
  },
  cancelarText: {
    fontWeight: 500
  },
  delete: {
    padding: 6,
    backgroundColor: 'rgb(50, 84, 219)',
    borderRadius: 8
  },
  deleteText: {
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2
  }
})
