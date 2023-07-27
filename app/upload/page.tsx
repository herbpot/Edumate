'use client'
import { useState } from 'react'

function Upload() {
  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      console.log(file);
      
      data.set('file', file)

      const res = await fetch('/api/upload', {
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
  return (
    <div className='uploadForm'>
      <form onSubmit={onSubmit} className='uploadForm'>
        <div className='uploadsrc'>
          <img src="" alt="" />
        </div>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input id="title" type="text" placeholder='영상 제목' />
        <textarea id="description" placeholder='영상 설명' />
        <select name="tag" id="tag">
            <option value="math" selected>수학</option>
            <option value="math">국어</option>
            <option value="math">영어</option>
            <option value="math">물리1</option>
            <option value="math">물리2</option>
            <option value="math">화학1</option>
            <option value="math">화학2</option>
            <option value="math">생명1</option>
            <option value="math">생명2</option>
            <option value="math">지구1</option>
            <option value="math">지구2</option>
            <option value="math">정법</option>
            <option value="math">한지</option>
            <option value="math">세지</option>
            <option value="math">여지</option>
            <option value="math">여지</option>
        </select>
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}

export default Upload;
