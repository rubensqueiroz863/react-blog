import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

const Prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios.");
        }

        const users = await Prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!users) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, users.password!);
        if (!isPasswordValid) return null;

        return { id: users.id, name: users.name, email: users.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !user.email) return false;

      // Procura usuário existente no Prisma
      const existingusers = await Prisma.users.findUnique({
        where: { email: user.email },
      });

      if (!existingusers) {
        await Prisma.users.create({
          data: {
            email: user.email,
            name: user.name || profile?.name || "Sem nome",
            image: user.image || profile?.image || `https://ui-avatars.com/api/?name=${user.name?.[0] || "?"}&background=random&size=128`,
            provider: account.provider,
          },
        });
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
