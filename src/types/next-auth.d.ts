import NextAuth, { DefaultSession } from 'next-auth';

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name?: string,
            role?: string,
            [key?:string]: string
        } & DefaultSession['user'];
    }
    interface User {
        id: string,
        name: string,
        role: string,
        [key?:string]: string
    }
}
interface Data {
    date: string,
    time: string,
    name: string,
    tel: string
}