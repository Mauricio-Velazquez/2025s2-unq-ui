import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { styles } from './styles'

export default function PostSearchResults ({ posts }) {
  const router = useRouter()

  return (
    <View>
      <Text style={styles.sectionTitle}>Publicaciones</Text>
      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        columnWrapperStyle={styles.column}
        ItemSeparatorComponent={<View style={styles.separator} />}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 160 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => router.push(`/posts/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.postImage} />
          </TouchableOpacity>

        )}
      />
    </View>
  )
}
