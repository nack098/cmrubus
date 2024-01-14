"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link"
import { RedirectType, redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const {status} = useSession();
    const [error, errorState] = useState<string>("");
    if (status === "loading") {
        return (
            <p>Loading...</p>
        )
    }
    if (status === "authenticated") {
        redirect("/dashboard");
    }
    return (
        <div className="fixed w-full h-full grid">
            <div className="px-6 py-6 bg-[#777777] place-self-center translate-y-[-4rem] rounded-3xl translate-x-[-0.75rem]">
                <form 
                    className="bg-zinc-100 px-9 py-4 rounded-xl" 
                    action={async (data) =>{
                        const username = data.get('username') as string || "";
                        const password = data.get('password') as string || "";
                        const res = await signIn("credentials", {
                            username,password, redirect: false
                        });
                        if (!res) return
                        if (!res.error) {
                            redirect("/dashboard", RedirectType.replace)
                        }else {
                            errorState(res.error)
                        }
                    }}
                >
                    <p className="text-xl font-semibold mt-2">Login</p>
                    <div className="ml-4 my-2">
                        <label>Username :<br/>
                            <input type="text" name="username" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        </label>
                        <label>Password :<br/>
                            <input type="password" name="password" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        </label>
                        <div className={`flex flex-col w-full justify-center ${error?"mt-[0px]":"mt-5"}`}>
                        {error?<p className="text-right w-full text-red-600 font-semibold text-sm">Error: {error.replaceAll("_", " ")}</p>:null}
                            <input type="submit" value="Login" className="text-center mb-2 py-1 rounded-lg bg-[#fcbe20] hover:bg-red-400 duration-200 cursor-pointer"/>
                            <Link href="/register" className="text-center py-1 rounded-lg bg-[#20c7fc] hover:bg-red-400 duration-200">Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}