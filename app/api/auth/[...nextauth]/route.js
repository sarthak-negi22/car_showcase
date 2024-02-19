// jsm
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//     providers : [
//         GoogleProvider({
//             clientId : process.env.GOOGLE_ID,
//             clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//         })
//     ],
//     async session({ session }) {

//     },
//     async signIn({ profile }) {

//     }
// })

// export { handler as GET, handler as POST }


// gemini
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account.provider === 'google') {
        // Add custom logic to modify the token based on the Google account information
        token.user = account.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
