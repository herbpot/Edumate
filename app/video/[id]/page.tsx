import { notFound } from 'next/navigation';

export default async function Video({ params }: any) {  
  try{
    let video
    
    if (params.id == 'favicon.ico'){
      return
    }
    
    await fetch('http://localhost:3000/api/video/info',{
      method: 'POST',
      headers: {
        'id__': params.id
      }
    }).then(async(res) => {
      
      video = await res.json()
    });
    // console.log('video',video);
    
    
    return (
      <div className="videoViewFrame">
        <div className="videoFrame">
          <video src={'/api/video?fileName='+video!.src} controls></video>
          <div className="videoDiscription">
            <h1 className="videoTitle">{video!.title}</h1>
            <small className="uploaddate">{video!.date}에 게시</small>
            <small className="view">{video!.view}회 시청</small>
            <small className="good">{video!.good}명이 좋아함</small>
          </div>
        </div>
        <div className="fileFrame">
          <div className="files"></div>
          <div className="filecontent"></div>
        </div>
      </div>
    );
  }catch{
    notFound()
  }
}
