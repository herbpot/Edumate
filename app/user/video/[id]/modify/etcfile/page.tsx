'use client'
import { Video } from 'aws-sdk/clients/rekognition'
import { setCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export default function Etcfile({ params }: any) {
  const [file, setFile] = useState<[string]>()
  const [rmfile, setrmFile] = useState<[string]>([] as unknown as [string])
  const [newfile, setnewFile] = useState<FileList>()
  const [ isLoading, setLoading ] = useState(true)
  useEffect(() => {
      setLoading(true)
      fetch('/api/video/etcfile',{
          method: 'POST',
          headers: {
              id__: params.id
          },
          next: {
              revalidate: 10,
          }
      }).then((res) => {
          res.json().then((j) => {
            setFile(j.files)
            setLoading(false)
          })
      });
  },[params])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
        try {
            const data = new FormData()
            if (newfile){
                for (let i = 0; i < newfile.length; i++) {
                    data.append('file', newfile.item(i)!)
                }
            }
            if (rmfile){
                rmfile.map((rf) => {
                    data.append('rmfile',rf)
                })
            }

            setCookie('id', params.id)
            fetch('/api/video/modify', {
                method: 'POST',
                body: data
            }).then(() => window.location.href = '/')
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
  }
  const files = () => {
    const result = []
    if(newfile == null) return []
    for (let i = 0; i < newfile.length; i++) {
      result.push(
        <div className="etcfile"> 
          <h3>{newfile!.item(i)!.name}</h3>
          <small>{newfile!.item(i)!.size} byte</small>
        </div>
      )
    }
    return result
  }
  if(isLoading) return (
    <div>loading..</div>
  )
  return (
    <div className='uploadForm'>
      <form onSubmit={onSubmit} className='uploadForm'>
        <div className='uploadsrc'>
            {file?.map((f, i_) => {
                return(
                    <div key={Math.random()} id={f} className="etcfile"> 
                        <h3 key={Math.random()}>{f}</h3>
                        <small key={Math.random()} onClick={() => {
                            rmfile?.push(f)
                            document.getElementById(f)!.style.display = 'none'
                            setrmFile(rmfile)
                        }}>X</small>
                    </div>
                )
            })}
            {files()}
        </div>
        <input
          type="file"
          name="file"
          multiple={true}
          onChange={(e) => {
            if (!(e.target.files === undefined)){
                setnewFile(e.target.files!)
            }
        }}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}
