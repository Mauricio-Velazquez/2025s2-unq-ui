export default function Comment({comment, navigate}) {
    return (
        <article className="post__comment">
            <div className="post__user-image-container">
                <img src={`${comment.user?.image}`} alt={`Avatar de ${comment.user?.name}`} onClick={() => navigate(`/profile/${comment.user?.id}`)} />
            </div>
            <p className="post__comment-text"><span className="post__user-name-comment">{comment.user?.name}</span> {comment.body}</p>
        </article>
    )
}