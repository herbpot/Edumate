import * as fs from 'fs'

const CHUNK_SIZE_IN_BYTES = 1000000

function getVideoStream(req:Request) {
  const range = req.headers.get('range')

  if (!range) {
    return new Response('No Range is provieded', { status: 400} )
  }
  const path = 'src/data/video/'+req.url.split('fileName')[1].replace('=','')
  const b = fs.statSync(path).size
  const chunkStart = Number(range.replace(/\D/g, ''))
  const chunkEnd = Math.min(chunkStart+ CHUNK_SIZE_IN_BYTES, b - 1)
  const contentLength = chunkEnd - chunkStart + 1  

  const headers = {
    'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${b}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength.toString(),
    'Content-Type': 'video/mp4'
  } as { [key: string]: string}

  const stream = fs.createReadStream(path, {
    start: chunkStart,
    end: chunkEnd
  })
  return new Response(stream as any, {
    status: 206,
    headers
  })
}

export async function GET(req: Request) {
  return getVideoStream(req)
}