import { Image, StyleSheet, Text, View } from 'react-native'

export function UserImage ({ profile }) {
  return (
    <>
      {profile.image
        ? (
          <Image source={{ uri: profile.image }} style={styles.avatar} />
          )
        : (
          <View
            style={[styles.avatar, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}
          >
            <Text>No image</Text>
          </View>
          )}
    </>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    marginBottom: 10
  }
})
