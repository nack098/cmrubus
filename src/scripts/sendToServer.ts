"use server";

import { Data } from "@/types/next-auth";

export default async function sendToServer(data:Data, overlay:any) {
    overlay(false);
}