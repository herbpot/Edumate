'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Nav() {
    const {data:session, status} = useSession()
    const loading = status === 'loading';
    if (loading) {
        return <div>loading...</div>;
	};
    
    return (
        <div>
            <div className='navbar'>
                <img src="favicon.ico" alt="" />
                <Link href='/'>Home</Link>
                <Link href='/video/recent'>최근 본 영상</Link>
                <Link href='/video/like'>좋아요 표시한 영상</Link>
                <Link href='/video/likest'>가장 많이 본 영상</Link>
                <div className="navAuth">
                {
                    session ?
                    <div>
                        {session.user?.name}
                        <button onClick={() => signOut()}>로그아웃</button>
                    </div>
                    :
                    <button onClick={() => signIn()}>로그인</button>
                }
                </div>
            </div>
            <div className='dividLine' />
        </div>
    )
}