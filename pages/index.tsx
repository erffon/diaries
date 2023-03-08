import Head from "next/head";
import Header from "@/features/Header";
import ARTICLES from "../mockdata/articles";

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
      <div className="mx-10 w-auto pb-16 flex justify-between">
        <main className=" w-3/5">
          <h2 className="font-bold text-slate-500 rounded-lg mb-5 py-3 px-3 bg-indigo-100">
            آخرین نوشته‌ها
          </h2>
          <ul>
            {ARTICLES.slice(0, 3).map((item) => {
              return (
                <li
                  key={item.id}
                  className="border-b pb-7 px-3 hover:scale-105 transition duration-300 ease-out hover:cursor-pointer"
                >
                  <h3 className="font-semibold my-2 text-neutral-500">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-neutral-400 font-light text-sm">
                    {item.body.substring(0, 200)}
                  </p>
                </li>
              );
            })}
          </ul>
          <button className="bg-slate-200 px-3 py-1.5 mt-3 text-gray-600 rounded-lg hover:scale-95 transition duration-200 ease-out text-sm">
            مشاهده همه
          </button>
        </main>
        <aside className="w-1/3 h-2/3"></aside>
      </div>
    </>
  );
}
