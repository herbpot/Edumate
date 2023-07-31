'use client'
import { Video } from '@/app/api/video/info/route';
import Description from '@/src/components/Description';
import { notFound } from 'next/navigation';
import {useEffect, useState} from 'react'

export default function Video({ params }: any) {  
  const [video, setvideo] = useState<Video>()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    try{

      fetch('http://localhost:3000/api/video/info',{
        method: 'POST',
        headers: {
          id__: params.id
        },
        next: {
          revalidate: 10,
        }
      }).then((res) => {
        res.json().then((j) => {
          setvideo(j)
          setloading(false)
        })
      });
    }catch{
      notFound()
    }}, [params])
    if( loading || !video ) return (<div>loading..</div>)

    return (
      <div>
        <div className="videoViewFrame">
          <div className="videoFrame">
            <video src={'/api/video?fileName='+video!.src} controls></video>
            <Description video={video} id={params.id} isUploader={true} />
          </div>  
          <div className="fileFrame">
            <div className="files">
              {
                video.files.map((f) => {
                  return(
                  <div id={f} className="etcfile"> 
                    <h3>{f}</h3>
                  </div>
                  )
                })
              }
            </div>
            <div className="filecontent"></div>
          </div>
        </div>
          <div className='questionFrame'></div>
      </div>
    );
}
