'use client'

import { Video } from "@/app/api/video/info/route"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Description({ video, id, isUploader=false }: {video: Video, id: string, isUploader: boolean}) {
    const [good, setgood] = useState(video.good as unknown as string)
    if (!isUploader){
        return (
            <div className="videoDiscription">
                <h1 className="videoTitle">{video!.title}</h1>
                <small className="uploaddate">{video!.date}에 게시</small>
                <small className="view">{video!.view}회 시청</small>
                <button onClick={
                    () => {
                        fetch(`http://localhost:3000/api/video/good`, {
                            method: 'POST',
                            headers: {
                                vid: id
                            }
                        }).then(_ => {
                            _.text().then(t => setgood(t))
                        })
                    }
                }>good</button><small className="good">{good}명이 좋아함</small>
                <small>{video.uploader}이가 게시함</small>
            </div>
        )
    }else{
        return (
            <div className="videoDiscription">
                <h1 className="videoTitle">{video!.title}</h1>
                <small className="uploaddate">{video!.date}에 게시</small>
                <small className="view">{video!.view}회 시청</small>
                <small className="good">{good}명이 좋아함</small>
                <small>{video.uploader}이가 게시함</small>
                <button onClick={
                    () => {
                        fetch(`http://localhost:3000/api/video/delete`, {
                            method: 'POST',
                            headers: {
                                vid: id
                            }
                        }).then()
                    }
                }>게시물 삭제하기</button>
                <button onClick={() => {window.location.href += '/modify'}}>게시물 수정하기</button>
            </div>
        )
    }
}