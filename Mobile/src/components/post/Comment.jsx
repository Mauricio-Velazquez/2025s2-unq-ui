import { Image, Pressable, Text, View } from 'react-native'
import { capitalize } from '../../utils/logic'
import { Link } from 'expo-router'

export default function Comment ({ item }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingRight: 25, marginBottom: 16 }}>
      <Link href={`/profile/${item.user?.id}`} asChild>
        <Pressable style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(204, 204, 204, 1)', overflow: 'hidden' }}>
          <Image source={{ uri: item.user?.image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
        </Pressable>
      </Link>
      <View style={{ flexShrink: 1, maxWidth: '90%' }}>
        <Text style={{ fontWeight: 600, color: 'rgba(50, 50, 50, 1)' }}>
          <Link href={`/profile/${item.user?.id}`}>
            <Text>{(() => capitalize(item.user?.name))()}</Text>
          </Link>
          {' '}
          <Text style={{ fontWeight: 400 }}>{item.body}</Text>
        </Text>
      </View>
    </View>
  )
}
