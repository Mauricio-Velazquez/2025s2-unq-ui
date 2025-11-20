import { Image, StyleSheet } from 'react-native'

export function ProfileImage ({ profile, style }) {
  return <Image source={{ uri: profile.image }} style={{ ...styles.image, ...style }} />
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DDD'
  }
})
