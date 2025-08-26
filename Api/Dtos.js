export const transformUser = ({ id, email, password, image, followers }) => ({
  id,
  email,
  password,
  image,
  followers: followers.map((follower) => transformUserSimple(follower)),
});

export const transformUserSimple = (user) => ({
  id: user.id,
  name: user.name,
  image: user.image,
});

export const transformPost = ({
  id,
  image,
  description,
  user,
  date,
  comments,
  likes,
}) => ({
  id,
  description,
  image,
  user: transformUserSimple(user),
  date,
  commets: comments.map((comment) => ({
    id: comment.id,
    body: comment.body,
    user: transformUserSimple(comment.user),
  })),
  likes: likes.map((user) => transformUserSimple(user)),
});
