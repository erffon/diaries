import Header from "@/features/Header";
import style from "./Post.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { apiRoutes } from "@/constants/api-routes";
import { PostsType } from "@/interfaces/posts";
import MarkdownIt from "markdown-it";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { SinglePostType } from "@/interfaces/singlePost";

interface PostData {
  id: number;
  attributes: {
    title: string;
    description: string;
    tag: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    categories: {
      data: {
        id: number;
        attributes: {
          name: string;
          createdAt: Date;
          updatedAt: Date;
          publishedAt: Date;
        };
      }[];
    };
  };
}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Article = ({ postData }: { postData: PostData }) => {
  const [postDesc, setPostDesc] = useState("");
  useEffect(() => {
    const md = new MarkdownIt();
    const postDescription = md.render(`${postData?.attributes?.description}`);
    setPostDesc(postDescription);
  }, []);

  const postRawTime = postData?.attributes?.updatedAt.toString();
  const time = new Date(postRawTime);
  const releaseTime = `${time.getDay()} ${monthNames[time.getMonth()]}`;

  return (
    <>
      <Header />
      <main className="font-salel h-screen">
        <h2 className={style.title}>{postData?.attributes?.title}</h2>
        <div className={style["post-metadata"]}>
          <ul className="flex items-center gap-3 bg-neutral-100 px-3 py-1 rounded-lg text-sm text-neutral-400">
            <BiPurchaseTagAlt />
            {postData?.attributes?.categories?.data.map((item) => {
              return <li>{item?.attributes?.name}</li>;
            })}
          </ul>
          <p className="text-neutral-400 text-sm bg-neutral-100 px-3 py-1 rounded-lg">
            {releaseTime}
          </p>
        </div>
        <p
          className={style.description}
          dangerouslySetInnerHTML={{ __html: postDesc }}
        ></p>
      </main>
    </>
  );
};

export default Article;

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get<PostsType>(
    `${apiRoutes.ALL_POSTS}${params?.id}?populate=*`
  );

  return {
    props: {
      postData: data.data,
    },
  };
};
