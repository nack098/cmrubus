"use client";

import { Data } from "@/types/next-auth";

const HistoryRow = ({data: rowData}: {data:Data}) => {
    return (
        <tr>
            <td>
                {rowData.name}
            </td>
            <td>
                {rowData.date}
            </td>
            <td>
                {rowData.time}
            </td>
            <td>
                {rowData.tel}
            </td>
        </tr>
    )
}

export default function HistoryTable({data}:{data:Data[]}) {
    return (
        <table className="overflow-auto text-center">
            <tr>
                <th>
                    ชื่อ
                </th>
                <th>
                    วันที่
                </th>
                <th>
                    เวลาที่จอง
                </th>
                <th>
                    เบอร์โทรศัพท์
                </th>
            </tr>
            {data.map((rowData) => (<HistoryRow data={rowData}/>))}
        </table>
    );
}