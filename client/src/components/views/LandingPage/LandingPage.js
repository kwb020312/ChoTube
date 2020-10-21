import { Avatar, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Title from 'antd/lib/typography/Title';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import moment from 'moment'

function LandingPage() {
    const [Video, setVideo] = useState([])
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })
    },[])

    const renderCards = Video.map((video , i) => {
        let minutes = Math.floor(video.duration/60)
        let seconds = Math.floor((video.duration -  minutes*60))
        if(video.writer) {
            return (
                <Col lg={6} md={8} xs={24} key={i}>
                    <a href={`/video/${video._id}`}>
                        <div style={{position:'relative'}}>
                            <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thunmbnail" />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </div>
                    </a>
                    <br/>
                    <Meta avatar={<Avatar src={video.writer.image} />} title={video.title} description="" />
                    <span>{video.writer.name}</span>
                    <br />
            <span style={{marginLeft:'3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                </Col>
            )
        } else {
            return (
                null
            )
        }
    })

    return (
            <div style={{width: '85%' , margin:'3rem auto'}}>
                <Title level={2}>Recommended</Title>
                <hr/>
                <Row gutter={[32,16]}>
                    {renderCards}
                </Row>
            </div>
    )
}

export default LandingPage
