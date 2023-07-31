'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { setCookie } from 'cookies-next'

function Upload() {
  const [file, setFile] = useState<File>()
  const id = (Math.round(new Date().getTime() + Math.random()*10000)).toString()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      
      data.set('file', file)
      
      const title = document.getElementById('title')!.value
      const description = document.getElementById('description')!.value
      const tag_ = document.getElementById('tag')!
      const tag = tag_.options[tag_.selectedIndex].value
      setCookie('id', id)
      const res = await fetch('/api/video/upload', {
        method: 'POST',
        headers: {
          title: title,
          description: description,
          tag: tag,
          isVideo:'true'
        },
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
      window.location.href += '/etcfile'
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }
  return (
    <div className='uploadForm'>
      <form onSubmit={onSubmit} className='uploadForm'>
        <div className='uploadsrc'>
          <video className='testVideo' src={file? window.URL.createObjectURL(file): ''} controls></video>
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
