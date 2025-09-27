import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER, // wire later
      from: process.env.EMAIL_FROM, // wire later
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    }, // enrich later from Supabase
  },
});

export { handler as GET, handler as POST };
