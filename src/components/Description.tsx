'use client'
export type videotype = {
    title: string,
    src: string,
    date: string,
    view: number,
    good: number,
}

export default function Description({ video, id }: {video: videotype, id: string}) {
    
    
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
        </div>
    )
}