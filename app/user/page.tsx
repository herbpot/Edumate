import { getServerSession } from "next-auth"
import { authOption } from "../api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function user() {
    const session = await getServerSession(authOption)
    return(
        <div className="userinfo">
            <h3>{session?.user?.email}</h3>
            <h3>{session?.user?.name}</h3>
            <h3>{session?.user?.image}</h3>
            <Link href={'/user/video'}>게시물</Link>
        </div>
    )
}