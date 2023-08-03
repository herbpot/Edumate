'use client'
import { useState } from 'react'

function Upload() {
  const [file, setFile] = useState<FileList>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      
      for (let i = 0; i < file.length; i++) {
        data.append('file', file.item(i)!)
      }

      const res = await fetch('/api/video/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
      
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }
  const files = () => {
    const result = []
    if(file == null) return []
    for (let i = 0; i < file.length; i++) {
      result.push(
        <div className="etcfile"> 
          <h3>{file!.item(i)!.name}</h3>
          <small>{file!.item(i)!.size} byte</small>
        </div>
      )
    }
    return result
  }
  return (
    <div className='uploadForm'>
      <form onSubmit={onSubmit} className='uploadForm'>
        <div className='uploadsrc'>
          {files()}
        </div>
        <input
          type="file"
          name="file"
          multiple={true}
          onChange={(e) => {
            if (!(e.target.files === undefined)){
                setFile(e.target.files!)
            }
        }}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}

export default Upload;
