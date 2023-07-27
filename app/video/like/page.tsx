'use client'
import Link from 'next/link';


export default async function Home() {
  const video: {videos:[{}]} = await fetch('http://localhost:3000/api/videos/like',{
    method: 'POST',
    next: {
      revalidate: 10,
    }
  }).then(async (res) => await res.json())
  return (
    <div>      
      <div className='videoFrame full'>
        {video.videos.map((i) => {
            return (
              <div className='video'>
                <Link href={'/video/'+i.id} className='video'>
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
                </Link>
              </div>
          )
          })
        }
      </div>
    </div>
  )
}
