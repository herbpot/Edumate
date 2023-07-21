import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='navbar'>
          <Link href='/'>Home</Link>
          <Link href='/befor'>최근 본 영상</Link>
          <Link href='/link'>좋아요 표시한 영상</Link>
          <Link href='/best'>가장 많이 본 영상</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
