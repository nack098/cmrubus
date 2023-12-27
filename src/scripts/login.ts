"use client";

import { signIn } from "next-auth/react";

export default async function login(username:string, password:string) {
   const res = await signIn("credentials", {username, password, redirect: false}); 
   return res; 
}