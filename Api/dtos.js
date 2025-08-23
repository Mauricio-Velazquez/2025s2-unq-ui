export const transformUser = ({
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
