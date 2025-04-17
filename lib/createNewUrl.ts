//lib/createNewUrl.ts

"use server";
import getCollection, { URLS_COLLECTION } from "@/lib/db";

export default async function createNewUrl(alias: string, url: string) {
    const collection = await getCollection(URLS_COLLECTION); //this connects to the mongodb url collection

    const exists = await collection.findOne({ alias }); //.findOne from nextjs lab
    if (exists) throw new Error("Alias already taken");

    try {
        new URL(url); 
    } catch {
        throw new Error("Invalid URL");
    }

    await collection.insertOne({ alias, url }); //.insertOne from nextjs lab 
    return alias;
}
