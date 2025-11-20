import { FlatList, StyleSheet, View } from 'react-native'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { UserAndDateHeader } from '../UserAndDateHeader'

export default function Comments ({ handleComments, post, putComment }) {
  return (
    <View style={styles.commentsCardContainer} onTouchEnd={handleComments}>
      <View style={styles.commentsCard} onTouchEnd={(e) => e.stopPropagation()}>
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{ gap: 30 }}
          ListHeaderComponent={
            <View style={styles.commentHeader}>
              <UserAndDateHeader post={post} />
            </View>
                    }
          renderItem={({ item }) => <Comment item={item} />}
        />

        <CommentForm post={post} putComment={putComment} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentsCardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.23)',
    justifyContent: 'flex-end',
    paddingTop: 100
  },
  commentsCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 12,
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12
  },

  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 20,
    paddingLeft: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  }

})
