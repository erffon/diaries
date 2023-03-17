import Header from "@/features/Header";
import style from "./Post.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { apiRoutes } from "@/constants/api-routes";
import { PostsType } from "@/interfaces/posts";
import MarkdownIt from "markdown-it";
import { BiPurchaseTagAlt } from "react-icons/bi";

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
  const md = new MarkdownIt();
  const postDescription = md.render(postData?.attributes?.description);

  const postRawTime = postData?.attributes?.updatedAt.toString();
  const time = new Date(postRawTime);
  const releaseTime = `${time.getDay()} ${monthNames[time.getMonth()].slice(
    0,
    3
  )} ${time.getFullYear()}`;

  return (
    <>
      <Header />
      <main className="font-salel h-screen">
        <h2 className={style.title}>{postData?.attributes?.title}</h2>
        <div className={style["post-metadata"]}>
          <button className="flex items-center gap-2 bg-neutral-100 px-3 py-1 rounded-lg text-sm text-neutral-400">
            <BiPurchaseTagAlt />
            {postData?.attributes?.tag}
          </button>
          <p className="text-neutral-400 text-sm bg-neutral-100 px-3 py-1 rounded-lg">
            {releaseTime}
          </p>
        </div>
        <p
          className={style.description}
          dangerouslySetInnerHTML={{ __html: postDescription }}
        ></p>
      </main>
    </>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get<PostsType>(
    `${apiRoutes.ALL_POSTS}${params?.id}`
  );

  return {
    props: {
      postData: data.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await axios.get<PostsType>(apiRoutes.ALL_POSTS);

  const paths = data?.data.map((item) => {
    return { params: { id: item.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};
