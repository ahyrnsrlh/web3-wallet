import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Memperluas tipe default User dari next-auth
   */
  interface User {
    id: string;
    email: string;
    name?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Memperluas tipe JWT default */
  interface JWT {
    id: string;
  }
}
