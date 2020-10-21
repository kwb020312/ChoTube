import Axios from 'axios'
import React, { useEffect, useState } from 'react'
export default function SideVideo() {
    const [sideVideos , setSideVideos] = useState([])
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                setSideVideos(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })
    },[])

    const renderSideVideo = sideVideos.map((video,i) => {
        let minutes = Math.floor(video.duration/60)
        let seconds = Math.floor((video.duration -  minutes*60))
        if(video.writer) {
            return (
                <div key={i} style={{display:'flex' , marginTop:"3rem" , padding:'0 2rem'}}>
                    <div style={{width:'40%' , marginRight:'1rem'}}>
                        <a href>
                            <img style={{width:'100%' , height:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                        </a>
                    </div>
                    <div style={{width:'50%'}}>
                        <a href>
                            <span style={{fontSize:'1rem' , color:'black'}}>{video.title}</span>
                            <br/>
                            <span>{video.writer.name}</span>
                            <br/>
                            <span>{video.views} views</span>
                            <br/>
                            <span>{minutes} : {seconds}</span>
                        </a>
                    </div>
                </div>
            )
        } else {
            return null
        }
        
    })

    return(
        <>
            {renderSideVideo}
        </>
        
    )
}