"use client";

import ActionToReserveCarDate from "@/scripts/actionToReserveCarDate";
import { toast } from "react-toastify";

export default function ReserveCalendar() {
    return (
        <div className="flex flex-col text-lg bg-white w-full h-full ml-5 rounded-xl px-8 py-8">
            <p className="text-xl font-bold">จองเวลาเดินรถ</p>
            <form action={(formData) => {
                    const promise = ActionToReserveCarDate(formData)
                    toast.promise(promise, {
                        pending: "กำลังจอง...",
                        error: "จองไม่สำเร็จกรุณาลองใหม่",
                        success: "จองสำเร็จแล้ว"
                    })
                }}>
                <label>วันที่: <input type="date" name="date" className="bg-zinc-100"/></label><br/>
                <label>เวลา: <input list="time_list" name="time" className="bg-zinc-100" defaultValue="07:30" onClick={(e) => e.currentTarget.value = ""}/>
                    <datalist id="time_list">
                        <option value="07:30"/>
                        <option value="10:00"/>
                        <option value="13:00"/>
                        <option value="15:00"/>
                        <option value="16:15"/>
                        <option value="17:45"/>
                    </datalist>
                </label><br/>
                <input type="submit" className="text-center py-1 rounded-lg bg-[#20c7fc] hover:bg-red-400 duration-200 cursor-pointer px-3" value="จองเวลา"/>
            </form>
        </div>
    )
}