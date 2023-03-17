import Header from "@/features/Header";
import style from "./Post.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { apiRoutes } from "@/constants/api-routes";
import { PostsType } from "@/interfaces/posts";
import MarkdownIt from "markdown-it";

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

const Article = ({ postData }: { postData: PostData }) => {
  const md = new MarkdownIt();
  const postDescription = md.render(postData?.attributes?.description);
  return (
    <>
      <Header />
      <main className="font-salel h-screen">
        <h2 className={style.title}>{postData?.attributes?.title}</h2>
        <div className={style["post-metadata"]}>
          <button>{postData?.attributes?.tag}</button>
          <p>{postData?.attributes?.updatedAt.toString()}</p>
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
