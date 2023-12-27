"use client"
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const DriverOnly = () => {
    return (
        <>
            <Link href="/dashboard/profile/reservecalendar" className="bg-[#fcbe20] hover:bg-red-400 duration-200 rounded-md px-4 py-2 mt-4">จองเวลา</Link>
        </>
    )
}

const AdminOnly = () => {
    return (
        <>
        </>
    )
}

const DashboardNavigation = () => {
    const {data: session}= useSession();
    if (!session) return;
    return (
        <div className="flex flex-col text-center mt-5 w-[9rem]">
            <Link href="/dashboard/profile" className="bg-[#fcbe20] hover:bg-red-400 duration-200 rounded-md px-4 py-2">Profile</Link>
            <Link href="/dashboard/profile/history" className="bg-[#fcbe20] hover:bg-red-400 duration-200 rounded-md px-4 py-2 mt-4">History</Link>
            {session.user.role === "driver"?<DriverOnly />:null}
            {session.user.role === "admin"?<AdminOnly />:null}
        </div>
    )
}

export default DashboardNavigation