import { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import Header from "@/features/Header";
import { HiFire } from "react-icons/hi";
import { BiPurchaseTagAlt, BiSearch } from "react-icons/bi";
import style from "./Homepage.module.css";
import { apiRoutes } from "@/constants/api-routes";
import { Datum, PostsType } from "@/interfaces/posts";
import Link from "next/link";
import { Routes } from "@/constants/app-routes";
import { AllCatType } from "@/interfaces/categories";
import { TbCategory2 } from "react-icons/tb";
import { ChangeEvent, EventHandler, useState } from "react";

export default function Home({
  data: { data: POSTS },
  status,
  catData,
}: {
  data: PostsType;
  status: any;
  catData: AllCatType;
}) {
  const [searched, setSearched] = useState<Datum[]>([]);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const searchResult = POSTS.filter((item) =>
      item?.attributes?.title?.includes(query)
    );
    setSearched(searchResult);
  };
  return (
    <>
      <Head>
        <title>Diaries</title>
        <meta name="description" content="my private diaries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/myfavicon.ico" />
      </Head>
      <Header />
      <div className="-mt-2 mx-10">
        <div className="pb-5 flex items-center">
          <input
            type="text"
            placeholder="جستجو ..."
            className="py-2 px-5 rounded-r-lg"
            onChange={searchHandler}
          />
          <BiSearch className="text-white bg-slate-600 w-10 h-10 flex justify-center p-2 rounded-l-lg" />
        </div>
      </div>
      <div className="mx-10 w-auto pb-16 flex justify-between">
        <main className=" w-3/5">
          <h2 className="font-bold text-slate-500 rounded-lg mb-5 py-3 px-3 bg-indigo-100 flex gap-2 items-center">
            {" "}
            <HiFire className="text-xl" />
            آخرین نوشته‌ها
          </h2>
          <ul>
            {status === 200 &&
              searched
                .reverse()
                .slice(0, 3)
                .map((item) => {
                  return (
                    <li key={item?.id} className="border-b pb-7 px-3">
                      <Link href={`${Routes.HOME}post/${item?.id}`}>
                        <h3 className="font-semibold my-2 text-neutral-600">
                          {item?.attributes?.title}
                        </h3>
                        <p className="mb-3 text-neutral-500 font-light text-sm">
                          {item?.attributes?.description.substring(0, 200)}
                        </p>
                      </Link>
                      <div className="flex items-center gap-3">
                        <BiPurchaseTagAlt className="text-neutral-400" />
                        <button className={style.tags}>
                          {item?.attributes?.tag}
                        </button>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </main>
        <aside className="w-1/3">
          <h2 className="font-bold text-slate-500 rounded-lg mb-5 py-3 px-3 bg-indigo-100 flex gap-2 items-center">
            {" "}
            <TbCategory2 className="text-xl" /> دسته بندی ها
          </h2>
          <div className="flex flex-wrap justify-between">
            {catData?.data.map((item) => {
              return (
                <button key={item.id} className={style["cat-buttons"]}>
                  {item?.attributes?.name}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let { data, status } = await axios.get<PostsType>(apiRoutes.ALL_POSTS);
  let { data: catData } = await axios.get<AllCatType>(apiRoutes.ALL_CATEGORIES);

  return {
    props: {
      data,
      status,
      catData,
    },
  };
};
