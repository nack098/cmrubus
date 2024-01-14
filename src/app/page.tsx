"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const {data: session, status} = useSession();
  if (status === "authenticated") {
    redirect("/dashboard")
  }else if (status === "unauthenticated"){
    redirect("/login")
  }else{
    return(
      <p>
        Loading...
      </p>
    )
  }
}