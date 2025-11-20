import { FlatList, View } from 'react-native'
import { ProfileCard } from './ProfileCard'
import { FeedPost } from './FeedPost'

export default function Profile ({ profile }) {
  return (
    <FlatList
      ListHeaderComponent={<ProfileCard profile={profile} />}
      ItemSeparatorComponent={<View style={{ height: 2 }} />}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: 'flex-start',
        gap: '1%',
        paddingHorizontal: 5,
        marginRight: 4
      }}
      numColumns={3}
      data={profile.posts} renderItem={({ item }) => <FeedPost post={item} />}
    />
  )
}
