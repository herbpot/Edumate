'use client'
import Link from 'next/link';


export default async function Home() {
  const video: {videos:[{}]} = await fetch('http://localhost:3000/api/videos/like',{
    method: 'POST',
    next: {
      revalidate: 10,
    }
  }).then(async (res) => await res.json())
  console.log(video);
  
  const cut = 3
  const videos: any[][] = [[]]
  video.videos.map((i) => {
    if (video.videos.indexOf(i) / cut){
      videos.push(new Array())
    }
    videos[Math.floor(video.videos.indexOf(i) / cut)].push(i)
  })
  
  return (
    <div>      
      <div className='videoFrame full'>
        {videos.map((video) => {
          return (
            <div className='video hori'>
              {video.map((i) => {
            return (
              <Link href={'/video/'+i.id}>
                <div className='video'>
                  <div className='thumbnail videoViewFrame'>
                    <video src={'/api/video?fileName='+i.src}></video>
                  </div>
                  <div className='videoDescription'>
                    <h1 className='videoTitle'>{i.title}</h1>
                    <div className='videoDiscription'>
                      <small>{i.description}</small>
                      <small>{i.view}회 시청</small>
                    </div>
                  </div>
                </div>
              </Link>
              )
            })
          }
            </div>
          )
          })
        }
      </div>
    </div>
  )
}
