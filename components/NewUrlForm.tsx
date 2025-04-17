//components/NewUrlForm.tsx
"use client";

import { useEffect, useState } from "react";
import createNewUrl from "@/lib/createNewUrl";

export default function NewUrlForm() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [shortened, setShortened] = useState("");
    const [error, setError] = useState("");
    const [origin, setOrigin] = useState(""); 

    useEffect(() => {  //get the sit url on load
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    //handle submitting the form 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try { //try to save alias and url to db
          const savedAlias = await createNewUrl(alias, url);
          const shortUrl = `${window.location.origin}/${savedAlias}`;
          setShortened(shortUrl);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unexpected error occurred");
          }
        }
      };
      

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full max-w-md bg-[#fdf6ec] p-6 rounded shadow border border-[#7b4f2c]"
        >
        {/* url input*/}
            <label className="text-[#4b2e2e] font-semibold text-lg">URL</label>
            <input
                type="text"
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="p-2 border border-[#7b4f2c] rounded text-[#4b2e2e] placeholder-[#a97e60]"
                required
        />

        {/*alias inout*/}
        <label className="text-[#4b2e2e] font-semibold text-lg">Custom Alias</label>
        {origin && (
            <div className="text-sm text-[#7b4f2c] mb-1">
                {origin}/<span className="italic text-gray-500">your-custom-alias</span>
            </div>
        )}
        <input
            type="text"
            placeholder="your-custom-alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="p-2 border border-[#7b4f2c] rounded text-[#4b2e2e] placeholder-[#a97e60]"
            required
        />

        {/*sibmit button*/}
        <button
            type="submit"
            className="bg-[#7b4f2c] text-white p-2 rounded"
        >
            Shorten URL
        </button>

        {/*display*/}
        {shortened && (
            <p className="text-[#7b4f2c]">
            Your short URL:{" "}
            <a className="underline" href={shortened}>
                {shortened}
            </a>
            </p>
        )}

        {/*error message*/}
        {error && <p className=" text-red-600 ">Error: {error}</p>}
        </form>
    );
    }
