'use client'
import Description from '@/src/components/Description';
import FileContent from '@/src/components/FileContent';
import { notFound } from 'next/navigation';

export default async function Video({ params }: any) {  
  try{
    
    if (params.id == 'favicon.ico'){
      return
    }
    
    const video = await fetch('http://localhost:3000/api/video/info',{
      method: 'POST',
      headers: {
        id__: params.id
      },
      next: {
        revalidate: 10,
      }
    }).then(async(res) => {
      
      return await res.json()
    });
    
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
                  <div key={Math.random()} id={f} className="etcfile"> 
                    <h3 key={Math.random()}>{f}</h3>
                  </div>
                  )
                })
              }
              </div>
              <FileContent />
            
          </div>
        </div>
          <div className='questionFrame'></div>
      </div>
    );
  }catch{
    notFound()
  }
}
