import { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import Header from "@/features/Header";
import { HiFire } from "react-icons/hi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import style from "./Homepage.module.css";
import { apiRoutes } from "@/constants/api-routes";
import { PostsType } from "@/interfaces/posts";
import Link from "next/link";
import { Routes } from "@/constants/app-routes";

export default function Home({
  data: { data: POSTS },
  status,
}: {
  data: PostsType;
  status: any;
}) {
  console.log("🚀 ~ POSTS:", POSTS);
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
          <h2 className="font-bold text-slate-500 rounded-lg mb-5 py-3 px-3 bg-indigo-100 flex gap-2 items-center">
            {" "}
            <HiFire className="text-xl" />
            آخرین نوشته‌ها
          </h2>
          <ul>
            {status === 200 &&
              POSTS.reverse().map((item) => {
                return (
                  <Link href={`${Routes.HOME}article/${item?.id}`}>
                    <li key={item?.id} className="border-b pb-7 px-3">
                      <h3 className="font-semibold my-2 text-neutral-600">
                        {item?.attributes?.title}
                      </h3>
                      <p className="mb-3 text-neutral-500 font-light text-sm">
                        {item?.attributes?.description.substring(0, 200)}
                      </p>
                      <div className="flex items-center gap-3">
                        <BiPurchaseTagAlt className="text-neutral-400" />
                        <button className={style.tags}>
                          {item?.attributes?.tag}
                        </button>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </main>
        <aside className="w-1/3 h-2/3"></aside>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let { data, status } = await axios.get<PostsType>(apiRoutes.ALL_POSTS);

  return {
    props: {
      data,
      status,
    },
  };
};
