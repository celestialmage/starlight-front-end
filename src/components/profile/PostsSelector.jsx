import { useState } from 'react';
import PostList from '../timeline/PostList';


const PostsSelector = ({ posts, likes }) => {

    const [ postsSelected, setPostsSelected ] = useState(true);

    const selectPosts = () => {
        setPostsSelected(true);
    }

    const selectLikes = () => {
        setPostsSelected(false);
    }

    return (
        <div className='posts-list-container'>
            <div className='list-selector'>
                <p className='posts-selector' onClick={selectPosts}>Posts</p>
                <p className='likes-selector' onClick={selectLikes}>Liked</p>
            </div>
            <div className='posts-list'>
                { postsSelected && < PostList posts={posts} /> }
                { !postsSelected && < PostList posts={likes} /> }
            </div>
        </div>
    )

}

export default PostsSelector;