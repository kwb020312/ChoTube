import { Avatar, Comment } from 'antd'
import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function SingleComment({postId , comment , refreshFunction}) {
    const [OpenReply , setOpenReply] = useState(false)
    const [CommentValue , setCommentValue] = useState("")
    const user = useSelector((state) => state.user)
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const variables = {
            content:CommentValue,
            writer: user.userData._id,
            postId: postId,
            responseTo:comment._id,
        }
        Axios.post('/api/comment/saveComment' , variables)
        .then(response => {
            if(response.data.success) {
                refreshFunction(response.data.result)
                setCommentValue("")
                setOpenReply(false)
            } else {
                alert('커맨트를 저장하지 못했습니다.')
            }
        })
    }
    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]
    return (
        <div>
            <Comment actions={actions} author={comment.writer.name} avatar={<Avatar src={comment.writer.image} alt={"WriterImage"} /> } content={<p>{comment.content}</p>} />
            {OpenReply && <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea style={{width:'100%' , borderRadius:'5px'}} onChange={onHandleChange} value={CommentValue} placeholder="코멘트를 작성해 주세요" />
                <br />
                <button style={{width:'20%' , height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>}
        </div>
    )
}