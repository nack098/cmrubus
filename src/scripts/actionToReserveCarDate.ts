"use server";

import { db } from "@/database/database";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const ActionToReserveCarDate = async (formData: FormData) => {
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    if (date.length > 0 && time.length > 0) {
        const dataSnapShot = await getDoc(doc(collection(db, "date"), date))
        if (dataSnapShot.exists()){
            const data = {...dataSnapShot.data()};
            if (data[time]) {
                data[time]++
            }else{
                data[time] = 1
            }
            await setDoc(doc(collection(db, "date"), date), data)
        }
        else {
            await setDoc(doc(collection(db, "date"), date), {[time]: 1})
        }
    }
}

export default ActionToReserveCarDate;