import { RedirectType, redirect } from "next/navigation"
import bcrypt from "bcrypt";
import { db } from "@/database/database";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Register() {
    const RegisterAction = async (formData: FormData):Promise<void> => {
        "use server"
        const username = formData.get("username") as string;
        const password = formData.get("password") as string; 
        const driver_id = formData.get("driver_id") as string;
        const name = formData.get("name") as string;
        if (username.length == 0 || password.length == 0 || driver_id.length == 0 || name.length == 0) {
            redirect(`?error=Please insert all data`, RedirectType.push);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        try{
            await setDoc(doc(collection(db, "users")), {username, driver_id, name, password:hashPassword, role: "driver"})
        }catch(err:any){
            redirect(`?error=${err}`, RedirectType.push);
        }
        redirect("/login", RedirectType.replace);
    }
    return (
        <div className="fixed w-full h-full grid">
            <div className="px-6 py-6 bg-[#777777] place-self-center translate-y-[-4rem] rounded-3xl translate-x-[-0.75rem]">
                <form className="bg-zinc-100 px-9 py-4 rounded-xl" action={RegisterAction}>
                    <p className="text-xl font-semibold mt-2">Register</p>
                    <div className="ml-4 my-2">
                        <label>Username :<br/>
                            <input type="text" name="username" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        </label>
                        <label>Password :<br/>
                            <input type="text" name="password" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        </label>
                        <label>เลขใบขับขี่ :<br/>
                            <input type="text" name="driver_id" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        </label>
                        <label>ชื่อ/นามสกุล :<br/>
                            <input type="text" name="name" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        </label>
                        <div className="flex flex-col w-full justify-center mt-3">
                            <input type="submit" value="Register" className="text-center my-2 py-1 rounded-lg bg-[#fcbe20] hover:bg-red-400 duration-200" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}