//app/page.tsx

import NewUrlForm from "@/components/NewUrlForm";

//home page component
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6ec] p-4">
      <h1 className="text-3xl font-bold text-[#4b2e2e] mb-4">URL Shortener</h1>
      <h2 className="text-[#4b2e2e] mb-4">Shorten your long URLs into compact, shareable links</h2>
      <NewUrlForm />
    </main>
  );
}
