import { StyleSheet, Text, View } from 'react-native'

export function UserStats ({ profile }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}><Text style={styles.number}>{profile.posts?.length || 0}</Text> Publicaciones</Text>
      <Text style={styles.label}> <Text style={styles.number}>{profile.following?.length || 0}</Text> Seguidos</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20
  },
  stat: {
    alignItems: 'center'
  },
  number: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 13,
    color: 'gray'
  }
})
