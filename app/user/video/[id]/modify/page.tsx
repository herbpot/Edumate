'use client'
import { Video } from '@/app/api/video/info/route';
import { setCookie } from 'cookies-next'
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Modify({ params }: any) {
    const [ video, setVideo ] = useState<Video>()
    const [ isLoading, setLoading ] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch('/api/video/info',{
            method: 'POST',
            headers: {
                id__: params.id
            },
            next: {
                revalidate: 10,
            }
        }).then((res) => {
            res.json().then((j) => {
                setVideo(j)
                setLoading(false)
            })
        });
    },[params])
    if (isLoading) return (<div>loading..</div>)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = new FormData()
            const title = (document.getElementById('title')! as HTMLInputElement).value
            const description = (document.getElementById('description')! as HTMLTextAreaElement).value
            const tag_ = document.getElementById('tag')! as HTMLSelectElement
            const tag = tag_.options[tag_.selectedIndex].value
            setCookie('id', params.id)
            data.set('title',title)
            data.set('description',description)
            data.set('tag',tag)
            fetch('/api/video/modify', {
                method: 'POST',
                headers: {
                    isVideo:'true'
                },
                body: data
            }).then(() => window.location.href += '/etcfile')
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
    }
    
    return (
        <div className='uploadForm'>
          <form onSubmit={onSubmit} className='uploadForm'>
            <div className='uploadsrc'>
              <video className='testVideo' src={'/api/video?fileName='+video!.src} controls></video>
            </div>
            <input id="title" type="text" placeholder='영상 제목' defaultValue={video!.title} />
            <textarea id="description" placeholder='영상 설명' defaultValue={video!.description} />
            <select name="tag" id="tag" defaultValue={'math'}>
                <option value="math">수학</option>
                <option value="krla">국어</option>
                <option value="engl">영어</option>
                <option value="phs1">물리1</option>
                <option value="phs2">물리2</option>
                <option value='chm1'>화학1</option>
                <option value='chm2'>화학2</option>
                <option value='bio1'>생명1</option>
                <option value='bio2'>생명2</option>
                <option value='esc1'>지구1</option>
                <option value='esc2'>지구2</option>
                <option value='eths'>윤사</option>
                <option value='kgry'>한지</option>
                <option value='wgry'>세지</option>
                <option value='leth'>생윤</option>
                <option value='pola'>정법</option>
                <option value='sclt'>사문</option>
                <option value='tgry'>여지</option>
            </select>
            <input type="submit" value="Upload" />
        </form>
        <Script id="select-option">
            {`document.getElementById('tag').value='${video!.tag}'`}
        </Script>
        </div>
    )
}