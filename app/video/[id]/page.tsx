'use client'
import { Video } from '@/app/api/video/info/route';
import Description from '@/src/components/Description';
import FileContent from '@/src/components/FileContent';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Video({ params }: any) {  
  const [video, setvideo] = useState({} as Video)
  const [loading, setLoading] = useState(true)
  
  useEffect(() =>{
    fetch('http://localhost:3000/api/video/info',{
      method: 'POST',
      headers: {
        id__: params.id
      },
      next: {
        revalidate: 10,
      }
    }).then((res) => {
      res.json().then(j =>{
        setvideo(j)
        setLoading(false)
      })
    });
  }, [params])
  
  if (loading) return
  
  return (
    <div>
      <div className="videoViewFrame">
        <div className="videoFrame">
          <video src={'/api/video?fileName='+video!.src} controls></video>
          <Description video={video} id={params.id} isUploader={false} />
        </div>  
        <div className="fileFrame">
          <div className="files">
            {
              video.files.map((f: string, i_:number) => {
                
                return(
                  <FileContent key={i_} name={f} />
                )
              })
            }
            </div>
          
        </div>
      </div>
        <div className='questionFrame'></div>
    </div>
  );
}
