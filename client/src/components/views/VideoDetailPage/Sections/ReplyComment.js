import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

export default function ReplyComment({commentLists,parentCommentId , postId , refreshFunction}) {
    const [ChildCommentNumber , setChildCommentNumber] = useState(0)
    const [OpenReplyComments , setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0
        commentLists.map((comment) => {
            if(comment.responseTo === parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    },[commentLists])
    const renderReplyComment = (parentCommentId) => (
        commentLists.map((comment) => (
            <>
                { comment.responseTo === parentCommentId &&
                    (
                        <div style={{width:'80%', marginLeft:'40px'}}>
                            <SingleComment postId={postId} refreshFunction={refreshFunction} comment={comment} postId={postId} />
                            <ReplyComment refreshFunction={refreshFunction} commentLists={commentLists} postId={postId} parentCommentId={comment._id} />
                        </div>
                    )
                }
            </>
        ))
    )
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    return (
        <div>
            {ChildCommentNumber > 0  && <p onClick={onHandleChange} style={{fontSize:'14px' , margin: 0 , color:'gray'}}>View {ChildCommentNumber} more Comment(s)</p>}
            {OpenReplyComments && renderReplyComment(parentCommentId)}
        </div>
    )
}