export const transformUser = ({ id, email, password, image, followers }) => ({
  id,
  email,
  password,
  image,
  following: followers.map((follower) => transformUserSimple(follower))
})

export const transformUserSimple = (user) => ({
  id: user.id,
  name: user.name,
  image: user.image
})

export const transformPost = ({
  id,
  image,
  description,
  user,
  date,
  comments,
  likes
}) => ({
  id,
  description,
  image,
  user: transformUserSimple(user),
  date,
  commets: comments.map(transformComment),
  likes: likes.map((user) => transformUserSimple(user))
})

export const transformUserPosts = ({
  id,
  email,
  name,
  image,
  followers,
  posts
}) => ({
  id,
  email,
  name,
  image,
  following: (followers || []).map(transformUserSimple),
  posts: (posts || []).map(transformPost)
})

export const transformUserTimeline = ({
  id,
  email,
  name,
  image,
  followers,
  timeline
}) => ({
  id,
  email,
  name,
  image,
  following: (followers || []).map(transformUserSimple),
  timeline: (timeline || []).map(transformPost)
})

export const transformComment = (comment) => ({
  id: comment.id,
  body: comment.body,
  user: transformUserSimple(comment.user)
})
