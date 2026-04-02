import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "MOCK_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK_SECRET",
    }),
    // Keep the mock credentials login for demo purposes
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email) {
          // Return a mock user based on the entered email
          return { 
            id: "1", 
            name: credentials.email.split('@')[0], 
            email: credentials.email 
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev",
});

export { handler as GET, handler as POST };
