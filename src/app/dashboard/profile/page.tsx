"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

export default function Dashboard() {
    const {data, status} = useSession();
    if (status === "authenticated") {
        return (
            <div className="flex flex-col text-lg bg-white w-full h-full ml-5 rounded-xl px-8 py-8">
                {Object.keys(data.user).map(key => {
                    return<p>{key}: {data.user[key]}</p>
                })}
            </div>
        )
    }else if (status === "loading") {
        return (
            <p>Loading...</p>
        )
    }else {
        redirect("/login", RedirectType.replace);
    }
}