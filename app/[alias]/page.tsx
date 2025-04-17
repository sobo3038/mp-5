//app/[alias]/page.tsx

import getUrlByAlias from "@/lib/getUrlByAlias";
import { redirect } from "next/navigation";

//handles the requests to /alias
export default async function RedirectPage({ 
    params,
}: { 
    params: Promise<{ alias: string }> 
}) {
  const { alias } = await params; 
  const url = await getUrlByAlias(alias); 

  //if not url is found --> error mesage
  if (!url) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#fdf6ec]">
            <h2 className="text-2xl font-bold text-[#b43e3e]">Alias was not found</h2>
            <p className="mt-4 text-[#4b2e2e]">The alias <strong>{alias}</strong> doesn’t exist in database. </p>
        </div>
    );
  }
  redirect(url);
}
