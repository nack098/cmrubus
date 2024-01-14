import { db } from "@/database/database";
import { Data } from "@/types/next-auth";
import { collection, doc, setDoc } from "firebase/firestore";

export default async function sendToServer(data:Data) {
    await setDoc(doc(collection(db, "reserveList")), data)
}