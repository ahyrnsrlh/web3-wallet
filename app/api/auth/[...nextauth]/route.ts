import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

// Check for NextAuth secret
if (!process.env.NEXTAUTH_SECRET) {
  console.warn(
    "WARNING: NEXTAUTH_SECRET is not set in environment variables. Using a fallback for development only. This is insecure for production!"
  );
}

// Buat opsi untuk NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Cek koneksi Supabase
          let supabaseAvailable = true;
          try {
            const { error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
              console.error("Supabase session error:", sessionError.message);
              supabaseAvailable = false;
            }
          } catch (connError) {
            console.error("Supabase connection error:", connError);
            supabaseAvailable = false;
          }

          // Fallback jika Supabase tidak tersedia
          if (!supabaseAvailable) {
            console.warn(
              "Using test account fallback because Supabase is unavailable"
            );
            if (
              process.env.NODE_ENV === "development" &&
              credentials.email === "test@example.com" &&
              credentials.password === "password"
            ) {
              return {
                id: "test-user-id",
                email: credentials.email,
                name: "Test User",
              };
            }
            return null;
          }

          // Autentikasi dengan Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            console.error("Supabase auth error:", error.message);
            return null;
          }

          const user = data.user;
          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.email?.split("@")[0] || "User",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET || "NEXT_AUTH_SECRET_FALLBACK_FOR_DEV",
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
