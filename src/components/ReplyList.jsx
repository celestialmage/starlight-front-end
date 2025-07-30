import Reply from './Reply';

const ReplyList = ({replies}) => {
    return replies.map((reply, index) => {
        <Reply reply={reply} key={index}/>
    })
}

export default ReplyList;