export class RegisterUserDTO {
  constructor ({ name, email, password, image }) {
    this.name = name
    this.email = email
    this.password = password
    this.image = image
  }
}

export class LoginUserDTO {
  constructor ({ email, password }) {
    this.email = email
    this.password = password
  }
}

export const transformUserSimple = (user) => ({
  id: user.id,
  name: user.name,
  image: user.image
})

export const transformComment = (comment) => ({
  id: comment.id,
  body: comment.body,
  user: transformUserSimple(comment.user)
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
  comments: (comments || []).map(transformComment), // <- default []
  likes: (likes || []).map((user) => transformUserSimple(user)) // <- default []
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
  timeline: (timeline || []).map(transformPost) // <- default []
})
