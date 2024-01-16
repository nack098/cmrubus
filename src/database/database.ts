import { initializeApp, getApps } from "firebase/app";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID 
};

const AppInstance = getApps().length === 0 ? initializeApp(firebaseConfig): getApps()[0];

const db = getFirestore(AppInstance);

const getDateData = async(setData:any) => {
    const newDataSnapshot = await getDocs(collection(db,'date'));
    const newData:any = [];
    const promiseArr:Promise<void>[] = [];
    newDataSnapshot.forEach((value) => {
        const data = value.data();
        Object.keys(data).map(((key:string) => {
            promiseArr.push(new Promise(async (resolve) => {
                const reserve = await getDocs(query(collection(db, 'reserveList'), where("date", "==", value.id), where("time", "==", key)));
                newData.push({
                    title: key,
                    color: '#36b357',
                    start: value.id,
                    description: `${data[key]*30 - reserve.size} ที่`
                })
                resolve();
            }))
        }))
    })
    await Promise.all(promiseArr);
    setData(newData)
}

export { AppInstance, db };

export default getDateData;