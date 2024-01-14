import { db } from "@/database/database";
import { Data } from "@/types/next-auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function getData(userId:string):Promise<Data[]> {
    const rawData = await getDocs(query(collection(db, "reserveList"), where("userId", "==", userId)))
    const data:Data[] = [] 
    rawData.forEach((value) => {
        data.push(value.data() as Data)
    })
    return data;
}