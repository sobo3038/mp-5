//lib/createNewUrl.ts

"use server";
import getCollection, { URLS_COLLECTION } from "@/lib/db";
import { ShortenResult } from "@/types";

export default async function createNewUrl(alias: string, url: string): Promise<ShortenResult | null> {
    const collection = await getCollection(URLS_COLLECTION); //this connects to the mongodb url collection

    const exists = await collection.findOne({ alias }); //.findOne from nextjs lab
    if (exists) return null;

    try {
        new URL(url); 
    } catch {
        return null;
    }

    await collection.insertOne({ alias, url }); //.insertOne from nextjs lab 
    return {
        success: true,
        alias,
        url,
    };
}
