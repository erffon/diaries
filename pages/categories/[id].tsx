import Header from "@/features/Header";
import { useRouter } from "next/router";
import style from "./Categories.module.css";
import { GetServerSideProps } from "next";
import axios from "axios";
import { apiRoutes } from "@/constants/api-routes";
import { SingleCatType } from "@/interfaces/singleCategory";
import Link from "next/link";

const Categories = ({ data }: { data: SingleCatType }) => {
  const { query } = useRouter();
  return (
    <>
      <Header />
      <h2 className={style.title}>{`دسته بندی ${query.name}`}</h2>
      <ul className={style["posts-container"]}>
        {data?.data?.attributes?.posts?.data.map((item) => {
          return (
            <Link href={`/post/${item?.id}`}>
              <li key={item?.id}>
                <h3>{item?.attributes?.title}</h3>
                <p>{item?.attributes?.description.slice(0, 200)}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Categories;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get<SingleCatType>(
    `${apiRoutes.ALL_CATEGORIES}${ctx.query.id}?populate=*`
  );

  return {
    props: {
      data,
    },
  };
};
