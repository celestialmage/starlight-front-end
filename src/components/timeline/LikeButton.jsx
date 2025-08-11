import { useState } from 'react';
import { likePost, unlikePost, fetchWithAuth } from '../utils/api';

const LikeButton = ({ post }) => {

    console.log(post);

    const [liked, setLiked] = useState(post.user_liked);

    let button;

    const likeCurrentPost = () => {
        // return likePost(postId).then(() => setLiked(!liked)).then();
        const options = {
            postId: post.id
        }
        return fetchWithAuth(likePost, options).then(setLiked(true)).then(post.like_count++)
    }

    const unlikeCurrentPost = () => {
        const options = {
            postId: post.id
        }
        return fetchWithAuth(unlikePost, options).then(setLiked(false)).then(post.like_count--);
    }

    if (!liked) {
        button = (
            <button className="unliked like-button button" onClick={(e) => {
                e.stopPropagation();
                likeCurrentPost(post.id).then();
            }}>
                {post.like_count} Likes
            </button>
        )
    } else {
        button = (
            <button className="liked like-button button" onClick={(e) => {
                e.stopPropagation();
                unlikeCurrentPost();
            }}>
                {post.like_count} Liked 
            </button>
        )
    }
    
    return button;
}

export default LikeButton;