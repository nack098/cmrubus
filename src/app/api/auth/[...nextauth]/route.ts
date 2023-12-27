import { NextAuthOptions, Session, User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions = {
    providers: [
       CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "username", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize() {
                return { id: "12314120", name:"nack" , role: "driver"}
            }
       }) 
    ],
    pages: {
        signIn : "/login"
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    role: user.role
                }
            }
            return token;
        },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    role: token.role
                }
            }
        },
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}