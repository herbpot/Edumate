import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers";
import NaverProvider from "next-auth/providers/naver";

const providers: Provider[] = [
  NaverProvider({
    clientId: process.env.NAVER_CLIENT_ID || "",
    clientSecret: process.env.NAVER_SECRET || "",
    profileUrl: "https://openapi.naver.com/v1/nid/me",
    profile: (profile) => {              
      return {
        id: profile.response.id,
        email: profile.response.email,
        name: profile.response.nickname,
      };
    },
  }),
]

export const authOption: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [...providers],

  callbacks: {
    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */
    async jwt({ token, user, account, profile }: any) {
      if (profile) {
        token.email = profile.response.email;
        token.name = profile.response.nickname;
      }
      return token
    },

    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, token }) {
      return session
    },
  },
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };