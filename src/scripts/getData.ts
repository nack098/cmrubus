import { Data } from "@/types/next-auth";
import { mock } from "node:test";

const mocks:Data[] = [
    {
        date: "2023-12-27",
        time: "10:00",
        name: "nack",
        tel: "0988889230"
    },
    {
        date: "2023-12-27",
        time: "10:00",
        name: "nack",
        tel: "0988889230"
    },
    {
        date: "2023-12-27",
        time: "10:00",
        name: "nack",
        tel: "0988889230"
    },
    {
        date: "2023-12-27",
        time: "10:00",
        name: "nack",
        tel: "0988889230"
    },
    {
        date: "2023-12-27",
        time: "10:00",
        name: "nack",
        tel: "0988889230"
    },
];

export default async function getData(userId:string):Promise<Data[]> {
    return mocks;
}