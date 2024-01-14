import { db } from "@/database/database";
import { NextAuthOptions, Session, User } from "next-auth";
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { collection, getDocs, query, where } from "firebase/firestore";

export const authOptions:NextAuthOptions = {
    providers: [
       CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "username", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const data = await getDocs(query(collection(db, "users"), where('username', '==', credentials.username)))
                let user:any;
                data.forEach((value:any) => {
                    const data = value.data();
                    if (bcrypt.compareSync(credentials.password, data.password)){
                        const dummy = {id: value.id, ...data};
                        const {password, ...userData} = dummy;
                        user = userData;
                    }
                })
                if (user) return user;
                return null;
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
                    ...user,
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
                    role: token.role,
                    ...token,
                }
            }
        },
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}