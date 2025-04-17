//lib/getUrlByAlias.ts
import getCollection, { URLS_COLLECTION } from "@/lib/db";

export default async function getUrlByAlias(alias: string): Promise<string | null> {
    const collection = await getCollection(URLS_COLLECTION); //this connects to the mongodb url collection
    const result = await collection.findOne({ alias });
    return result?.url || null; //return if found else null
}
