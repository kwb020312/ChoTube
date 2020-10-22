import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Comment({postId}) {
    const videoId = postId
    const user = useSelector(state => state.user)
    const [commentValue , setCommentValue] = useState("")
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const variables = {
            content:commentValue,
            writer: user.userData._id,
            postId: videoId
        }
        Axios.post('/api/comment/saveComment' , variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
            } else {
                alert('커맨트를 저장하지 못했습니다.')
            }
        })
    }
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr/>
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea style={{width:'100%' , borderRadius:'5px'}} onChange={handleClick} value={commentValue} placeholder="코멘트를 작성해 주세요" />
                <br />
                <button style={{width:'20%' , height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}