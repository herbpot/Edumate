'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
    const {data:session, status} = useSession()
    const loading = status === 'loading';
    if (loading) {
        return <div>loading...</div>;
	};
    console.log(loading, session);


    
    return (
        <div>
            <div className='navbar'>
                <img src="favicon.ico" alt="" />
                <Link href='/'>Home</Link>
                <Link href='/befor'>최근 본 영상</Link>
                <Link href='/link'>좋아요 표시한 영상</Link>
                <Link href='/best'>가장 많이 본 영상</Link>
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