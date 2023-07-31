'use client'

import Link from "next/link"

export type videotype = {
    title: string,
    src: string,
    date: string,
    view: number,
    good: number,
    uploader: string,
    files: any[],
}

export default function Description({ video, id, isUploader=false }: {video: videotype, id: string, isUploader: boolean}) {
    
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
                        }).then((req) => console.log(req))
                    }
                }>good</button><small className="good">{video!.good}명이 좋아함</small>
                <small>{video.uploader}이가 게시함</small>
            </div>
        )
    }else{
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
                        }).then((req) => console.log(req))
                    }
                }>good</button>
                <small className="good">{video!.good}명이 좋아함</small>
                <small>{video.uploader}이가 게시함</small>
                <button onClick={
                    () => {
                        fetch(`http://localhost:3000/api/video/delete`, {
                            method: 'POST',
                            headers: {
                                vid: id
                            }
                        }).then((req) => console.log(req))
                    }
                }>게시물 삭제하기</button>
                <button onClick={() => {window.location.href += '/modify'}}>게시물 수정하기</button>
            </div>
        )
    }
}