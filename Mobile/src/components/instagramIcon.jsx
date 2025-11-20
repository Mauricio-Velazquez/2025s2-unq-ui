import { Image } from 'react-native'

export function InstagramIcon ({ width, height }) {
  return (
    <Image style={{ width, height }} source={require('../assets/instagram-icon.png')} />
  )
}
