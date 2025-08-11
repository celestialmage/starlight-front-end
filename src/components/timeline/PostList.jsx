import Post from './Post';
import './PostList.css';

const PostList = ({ posts }) => {

    const timeline = posts.reverse().map((post,index) => (
        < Post post={post} index={index} key={index} />
    ));

    return (
        <div className={'timeline'} >
            {timeline}
        </div>
    )
}   

export default PostList;