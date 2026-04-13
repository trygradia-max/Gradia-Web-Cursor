import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const demoUsers: Array<{
  id: string;
  email: string;
  name: string;
  clientId: string;
}> = [
  {
    id: "user-demo",
    email: "demo@gradia.example",
    name: "Demo Client",
    clientId: "client-acme",
  },
  {
    id: "user-globex",
    email: "ops@globex.example",
    name: "Globex Ops",
    clientId: "client-globex",
  },
];

function getDemoPassword() {
  return process.env.PORTAL_DEMO_PASSWORD ?? "gradia-demo";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);
        if (password !== getDemoPassword()) return null;
        const user = demoUsers.find((u) => u.email === email);
        if (!user) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          clientId: user.clientId,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.clientId = user.clientId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.clientId = (token.clientId as string) ?? "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/portal/login",
  },
});
