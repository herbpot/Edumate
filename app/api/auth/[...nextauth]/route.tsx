import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";


const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_SECRET || "",
      profileUrl: "https://openapi.naver.com/v1/nid/me",
      profile: (profile) => {     
        // console.log(profile.response);
           
        return {
          id: profile.response.id,
          email: profile.response.email,
          name: profile.response.nickname,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (profile) {
        token.email = profile.response.email;
        token.name = profile.response.nickname;
      }
      return token
    },
    async session({ session, user }) {
        return session;
  }
}
});

export { handler as GET, handler as POST };