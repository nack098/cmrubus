"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"

const Profile = () => {
    return(
        <div className="flex h-full text-center mr-12">
            <Link href="/dashboard" className="self-center bg-transparent hover:bg-blue-500 hover:text-white duration-200 px-5 py-5 rounded-md">รายการ/จอง</Link>
            <Link href="/dashboard/profile" className="self-center bg-transparent hover:bg-blue-500 hover:text-white duration-200 px-5 py-5 rounded-md">ข้อมูลส่วนบุคคล</Link>
            <button onClick={() => signOut({callbackUrl: "/login"})} className="self-center bg-transparent hover:bg-blue-500 hover:text-white duration-200 px-5 py-5 rounded-md">ออกจากระบบ</button>
        </div>
    )
}

const Login = () => {
    return (
        <div className="flex h-full text-center mr-12">
            <Link href="/login" className="self-center bg-transparent hover:bg-blue-500 hover:text-white duration-200 px-5 py-5 rounded-md">เข้าสู่ระบบ</Link>
        </div>
    )
}

export default function Navbar() {
    const { data, status } = useSession();
    return (
    <div className="w-full h-16 bg-[#ffe279] flex justify-between">
        <div className="ml-12 h-full flex">
            <p className="font-bold text-2xl self-center items-center">CMRU Bus</p>
        </div>
        {status==="authenticated"&&data?<Profile />: <Login />}
    </div>
)}