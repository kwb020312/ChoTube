import { Icon, Tooltip } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
export default function LikeDislikes({video , videoId , userId , commentId}) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction,setLikeAction] = useState(null)
    const [Dislikes,setDislikes] = useState(0)
    const [DisLikeAction,setDisLikeAction] = useState(null)
    let variable = {}
    useEffect(() => {
        if(video) {
            variable = {videoId ,userId}
        } else {
            variable = {commentId , userId}
        }
        Axios.post('/api/like/getLikes',variable)
        .then(response => {
            if(response.data.success) {
                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length)

                // 내가 좋아요를 눌렀는지
                response.data.likes.map(like => {
                    if(like.userId === userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('Likes에 정보를 가져오지 못했습니다.')
            }
        })
        Axios.post('/api/like/getDislikes',variable)
        .then(response => {
            if(response.data.success) {
                // 얼마나 많은 좋아요를 받았는지
                setDislikes(response.data.dislikes.length)

                // 내가 좋아요를 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === userId) {
                        setDisLikeAction('disliked')
                    }
                })
            } else {
                alert('DisLike 에 정보를 가져오지 못했습니다.')
            }
        })
    },[])

    const onLike = () => {
        if(LikeAction === null) {
            Axios.post('/api/like/upLike' , variable)
            .then(response => {
                if(response.data.success) {
                    setLikes(Likes + 1)
                    setLikeAction('liked')
                    if(DisLikeAction !== null) {
                        setDisLikeAction(null)
                        setDislikes(Dislikes-1)
                    }
                } else {
                    alert('Like를 올리지 못하였습니다.')
                }
            })
        } else {
            Axios.post('/api/like/unLike' , variable)
            .then(response => {
                if(response.data.success) {
                    setLikes(Likes - 1)
                    setLikeAction(null)
                } else {
                    alert('Like를 내리지 못하였습니다.')
                }
            })
        }
    }
    const onDislike = () => {
        if(DisLikeAction !== null) {
            Axios.post('/api/like/unDislike' , variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes - 1)
                    setDisLikeAction(null)
                } else {
                    alert('dislike을 하지 못하였습니다.')
                }
            })
        } else {
            Axios.post('/api/like/upDislike' , variable)
            .then(response => {
                if(response.data.success) {
                   setDislikes(DisLikeAction +1) 
                   setDisLikeAction('disliked')
                   if(LikeAction !== null) {
                       setLikeAction(null)
                       setLikes(Likes -1)
                   }
                } else {
                    alert('dislike을 하지 못하였습니다.')
                }
            })
        }
    }
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon onClick={onLike} type="like" theme={LikeAction === 'liked' ? 'filled':'outlined'} />
                </Tooltip>
    <span style={{paddingLeft:'8px' , cursor:'auto'}}> {Likes} </span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon onClick={onDislike} type="dislike" theme={DisLikeAction === 'disliked' ? 'filled':'outlined'}  />
                </Tooltip>
                <span style={{paddingLeft:'8px' , cursor:'auto'}}> {Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}