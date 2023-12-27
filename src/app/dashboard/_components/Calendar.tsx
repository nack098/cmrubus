"use client"

import React, {useState} from 'react';
import tippy from 'tippy.js';
import thlocale from '@fullcalendar/core/locales/th'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import sendToServer from '../../../scripts/sendToServer';

function Overlay({time, date, overlay}:{time:string, date:string, overlay:any}) {
    return (
        <>
            <div className="fixed z-40 h-full w-full bg-black opacity-60" onClick={() => {overlay(false)}} />
            <div className="top-[50%] left-[50%] fixed position z-50 place-self-center bg-white opacity-100 rounded-lg translate-x-[-50%] translate-y-[-60%]">
                <p className="font-bold text-xl mt-5 mx-5">จอง</p>
                <form action={async (data) => {
                    const tel = data.get('tel') as string || null;
                    const name = data.get('name') as string || null;
                    if (!(tel && name)) return;
                    sendToServer({date,time,name,tel}, overlay)
                }}
                    className="mx-4 px-6 pt-2 pb-5"
                >
                    <p><b>เวลา :</b> {time}</p>
                    <p><b>วันที่</b> : {date}</p>
                    <label><b>ชื่อ</b></label><br />
                    <input type="text" name="name" className="border-black rounded-sm border-[1px] text-sm text-center w-full"/><br/>
                    <label><b>เบอร์โทรศัพท์ (ไม่ต้องมีขีด)</b></label><br />
                    <input type="text" name="tel" className="border-black rounded-sm border-[1px] text-sm text-center w-full"/><br/>
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
                            setDate(info.event.start?.toLocaleDateString()||"");
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
                    events={[
                        {
                            title: '07:30',
                            color: '#36b357',
                            start: '2023-12-27',
                            description: '12 ที่'
                        },
                        {
                            title: '10:00',
                            color: '#36b357',
                            start: '2023-12-27',
                            description: '12 ที่'
                        },
                        {
                            title: '13:00',
                            color: '#1586d6',
                            start: '2023-12-27',
                            description: '12 ที่'
                        },
                        {
                            title: '15:00',
                            color: '#1586d6',
                            start: '2023-12-27',
                            description: '12 ที่'
                        },
                        {
                            title: '16:15',
                            color: '#1586d6',
                            start: '2023-12-27',
                            description: '12 ที่'
                        },
                        {
                            title: '17:45',
                            color: '#1586d6',
                            start: '2023-12-27',
                            description: '12 ที่'
                        }
                    ]}
                />
            </div>
        </div>
    )
}