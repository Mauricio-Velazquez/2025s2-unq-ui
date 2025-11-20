import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { toastError } from '../../utils/toastify'

export default function CommentForm ({ post, putComment }) {
  const [body, setBody] = useState('')

  const [commentError, setCommentError] = useState(false)

  const handleComment = (text) => {
    setBody(text)
    setCommentError(false)
  }

  const handleSubmit = async () => {
    // console.log(comment)
    if (body.trim() === '') {
      setCommentError(true)
      return
    }

    try {
      putComment(body)
      setBody('')
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={handleComment}
        placeholder='Agrega un comentario'
      />
      {commentError && <Text style={{ color: ' rgb(231, 59, 59)' }}>el comentario no puede ser vacio</Text>}
      <Pressable style={styles.publishButton} onPress={handleSubmit}>
        <Text style={styles.publishText}>Publicar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 12
    // backgroundColor: 'black'
  },

  input: {
    color: '#999',
    paddingLeft: 15,
    paddingTop: 0,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 80
  },

  publishButton: {
    marginTop: 10,
    backgroundColor: '#7A77FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
  },

  publishText: {
    color: 'white',
    fontWeight: '500'
  }
})
