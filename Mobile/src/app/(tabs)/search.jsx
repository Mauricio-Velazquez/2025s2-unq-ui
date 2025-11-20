import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import useSearch from '../../hooks/useSearch'
import { useState } from 'react'
import { UsersSearchResults } from '../../components/search/UsersSearchResults'
import PostSearchResults from '../../components/search/PostSearchResults'
import LoadingIcon from '../../components/LoadingIcon'

export default function Search () {
  const { handleSearch, loading, posts, users } = useSearch()
  const [query, setQuery] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder='Buscar...'
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          onSubmitEditing={() => handleSearch(query)} // al apretar enter
        />
        <TouchableOpacity onPress={handleSearch}>
          <Feather name='search' size={22} color='gray' />
        </TouchableOpacity>
      </View>

      {loading && <LoadingIcon />}
      {users.length > 0 && <UsersSearchResults users={users} />}
      {posts.length > 0 && <PostSearchResults posts={posts} />}

      {!loading && ![...users, ...posts].length && query && (
        <Text style={styles.noResults}>No se encontraron resultados.</Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 20
  },
  container: {
    flex: 1,
    padding: 4
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16
  },
  input: {
    flex: 1,
    paddingVertical: 8
  },
  noResults: {
    marginTop: 16,
    fontSize: 14,
    color: 'gray'
  }
})
