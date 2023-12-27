"use sever";

import { getServerSession } from "next-auth";
import HistoryTable from "./_components/HistoryTable";
import getData from "@/scripts/getData";

export default async function History() {
    const session = await getServerSession();
    if (!session) return; 
    const data = await getData(session.user.id);
    return (
        <div className="flex flex-col text-lg bg-white w-full h-full ml-5 rounded-xl px-8 py-8">
            <HistoryTable data={data} />
        </div>
    )
}