import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Agency Portal",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Here you check your database for the user
        // Example: const user = await db.user.findUnique({ where: { email: credentials.email } })
        
        if (credentials.email === "admin@immobagency.com" && credentials.password === "secure_pass") {
          return { id: "1", name: "Admin User", role: "manager" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login', // Your custom login page
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role; // Add role to the session
      return session;
    }
  }
});

export { handler as GET, handler as POST };