import Reply from './Reply';
import './ReplyList.css';

const ReplyList = ({replies}) => {

    return (
        <div className='post replies'>
            {replies.map((reply, index) => 
                <Reply reply={reply} key={index}/>
            )}
        </div>
    )
}

export default ReplyList;