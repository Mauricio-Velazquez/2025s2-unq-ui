export const transformUser = ({ id, email, password, image, followers }) => ({
  id,
  email,
  password,
  image,
  followers: followers.map((follower) => transformUserSimple(follower))
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
  commets: comments.map((comment) => ({
    id: comment.id,
    body: comment.body,
    user: transformUserSimple(comment.user)
  })),
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
  followers: (followers || []).map((follower) => ({
    id: follower.id,
    name: follower.name,
    image: follower.image,
  })),
  posts: (posts || []).map((post) => ({
    id: post.id,
    description: post.description,
    image: post.image,
    user: post.user
        ? {
          id: post.user.id,
          name: post.user.name,
          image: post.user.image,
        }
        : null,
    date: post.date,
    comments: (post.comments || []).map((comment) => ({
      id: comment.id,
      body: comment.body,
      user: comment.user
          ? {
            id: comment.user.id,
            name: comment.user.name,
            image: comment.user.image,
          }
          : null,
    })),
    likes: (post.likes || []).map((like) => ({
      id: like.id,
      name: like.name,
      image: like.image,
    })),
  })),
});

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
  followers: (followers || []).map(f => ({
    id: f.id,
    name: f.name,
    image: f.image
  })),
  timeline: (timeline || []).map(post => ({
    id: post.id,
    description: post.description,
    image: post.image,
    user: post.user
        ? {
          id: post.user.id,
          name: post.user.name,
          image: post.user.image
        }
        : null,
    date: post.date,
    comments: (post.comments || []).map(c => ({
      id: c.id,
      body: c.body,
      user: c.user
          ? {
            id: c.user.id,
            name: c.user.name,
            image: c.user.image
          }
          : null
    })),
    likes: (post.likes || []).map(like => ({
      id: like.id,
      name: like.name,
      image: like.image
    }))
  }))
});
