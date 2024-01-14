"use client"

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Provider ({children}: React.PropsWithChildren) {
    return(
        <SessionProvider>
            {children}
            <ToastContainer/>
        </SessionProvider>
    )
}