"use server"

export default async function Register() {
    return (
        <div className="fixed w-full h-full grid">
            <div className="px-6 py-6 bg-[#777777] place-self-center translate-y-[-4rem] rounded-3xl translate-x-[-0.75rem]">
                <form className="bg-zinc-100 px-9 py-4 rounded-xl">
                    <p className="text-xl font-semibold mt-2">Register</p>
                    <div className="ml-4 my-2">
                        <label>Username :</label><br/>
                        <input type="text" name="username" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        <label>Password :</label><br/>
                        <input type="text" name="username" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        <label>รหัสนักศึกษา/บุคคลากร :</label><br/>
                        <input type="text" name="username" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        <label>ชื่อ/นามสกุล :</label><br/>
                        <input type="text" name="username" className="rounded-md px-3 py-[0.15rem] bg-zinc-300"></input><br/>
                        <div className="flex flex-col w-full justify-center mt-3">
                            <input type="submit" value="Register" className="text-center my-2 py-1 rounded-lg bg-[#fcbe20] hover:bg-red-400 duration-200" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}