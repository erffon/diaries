import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/features/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Diaries</title>
        <meta name="description" content="my private diaries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/myfavicon.ico" />
      </Head>
      <Header />
      <main className="mx-10">
        <div className="w-auto h-screen"></div>
      </main>
    </>
  );
}
