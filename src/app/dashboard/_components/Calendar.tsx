"use client"

import React, {useEffect, useState} from 'react';
import tippy from 'tippy.js';
import thlocale from '@fullcalendar/core/locales/th'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import sendToServer from '../../../scripts/sendToServer';
import getDateData from '@/database/database';
import {toast} from 'react-toastify'
import { useSession } from 'next-auth/react';

function Overlay({time, date, overlay}:{time:string, date:string, overlay:any}) {
    const {data: userData} = useSession();
    return (
        <>
            <div className="fixed z-40 h-full w-full bg-black opacity-60" onClick={() => {overlay(false)}} />
            <div className="top-[50%] left-[50%] fixed position z-50 place-self-center bg-white opacity-100 rounded-lg translate-x-[-50%] translate-y-[-60%]">
                <p className="font-bold text-xl mt-5 mx-5">จอง</p>
                <form action={async (data) => {
                    const tel = data.get('tel') as string || null;
                    const name = data.get('name') as string || null;
                    if (!(tel && name)) return;
                    const promise = sendToServer({date,time,name,tel, userId: userData?.user.id || ""})
                    toast.promise(promise, {
                        pending: "กำลังจอง...",
                        error: "จองไม่สำเร็จกรุณาลองใหม่",
                        success: "จองสำเร็จแล้ว"
                    })
                    await promise
                    overlay(false);
                }}
                    className="mx-4 px-6 pt-2 pb-5"
                >
                    <p><b>เวลา :</b> {time}</p>
                    <p><b>วันที่</b> : {date}</p>
                    <label><b>ชื่อ</b><br />
                        <input type="text" name="name" className="border-black rounded-sm border-[1px] text-sm text-center w-full"/><br/>
                    </label>
                    <label><b>เบอร์โทรศัพท์ (ไม่ต้องมีขีด)</b><br />
                        <input type="text" name="tel" className="border-black rounded-sm border-[1px] text-sm text-center w-full"/><br/>
                    </label>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => overlay(false)} className="text-center py-1 rounded-lg bg-[#fcbe20] hover:bg-red-400 duration-200 cursor-pointer px-3 mr-5">ยกเลิก</button>
                        <input type="submit" value="จอง" className="text-center py-1 rounded-lg bg-[#20c7fc] hover:bg-red-400 duration-200 cursor-pointer px-3" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default function Calendar() {

    const [showOverlay, overlayState] = useState<boolean>(false);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        getDateData(setData);
    },[])

    return(
        <div className="bg-white">
            {showOverlay?<Overlay date={date} time={time} overlay={overlayState} />:null}
            <div className="py-7 px-16">
                <FullCalendar 
                    plugins = {[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView='dayGridMonth'
                    headerToolbar={{
                        start: "today",
                        center: "title",
                        end: "prev next"
                    }}
                    height={"88vh"}
                    locale={thlocale}
                    expandRows={true}
                    eventClick={
                        (info) => {
                            if (info.event.start) {
                                const [month, date, year] = info.event.start.toLocaleDateString().split("/"); 
                                setDate(`${year}-${month.length == 1?`0${month}`:month}-${date.length == 1?`0${date}`:date}`);
                            }
                            setTime(info.event.title);
                            overlayState(true);
                        }
                    }
                    eventDidMount={
                        (info) => {
                            tippy(info.el, {
                                animation: 'scale',
                                interactive: true,
                                allowHTML: true,
                                content: info.event.extendedProps.description,
                                placement: 'right-start',
                            })
                    }}
                    events={data}
                />
            </div>
        </div>
    )
}