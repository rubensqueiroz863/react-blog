// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

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

        const user = await Prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password!)
        
        if (!isPasswordValid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const existingUser = await Prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await Prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              provider: account!.provider!,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};