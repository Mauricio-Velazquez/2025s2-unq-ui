import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { styles } from './styles'
import { ProfileImage } from './ProfileImage'

export function UsersSearchResults ({ users }) {
  const router = useRouter()

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(u) => u.id}
        horizontal
        ItemSeparatorComponent={<View style={{ width: 6 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/profile/${item.id}`)}>
            <View style={styles.userCard}>
              <ProfileImage profile={item} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
