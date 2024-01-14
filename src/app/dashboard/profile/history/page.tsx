"use client"
import HistoryTable from "./_components/HistoryTable";
import getData from "@/scripts/getData";
import { type Data } from "@/types/next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function History() {
    const {data: session}= useSession();
    const [data , dataState] = useState<Data[]>([]);
    useEffect(() => {
        if (!session) return
        const promise = getData(session.user.id).then((res) => dataState(res));    
        return () => {
            Promise.reject(promise)
        }
    }, [])
    return (
        <div className="flex flex-col text-lg bg-white w-full h-full ml-5 rounded-xl px-8 py-8">
            <HistoryTable data={data} />
        </div>
    )
}