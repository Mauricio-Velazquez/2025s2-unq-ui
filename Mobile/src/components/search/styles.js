import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  userCard: {
    alignItems: 'center',
    marginBottom: 8
  },
  postCard: {
    flexBasis: '32%',
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  postImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    resizeMode: 'cover'
  },
  postDesc: {
    padding: 6,
    fontSize: 12
  },
  column: {
    gap: 2
  },
  separator: {
    height: 2
  }
})
