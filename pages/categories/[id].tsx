import Header from "@/features/Header";
import { useRouter } from "next/router";
import style from "./Categories.module.css";
import { GetServerSideProps } from "next";
import axios from "axios";
import { apiRoutes } from "@/constants/api-routes";

const Categories = () => {
  const { query } = useRouter();
  return (
    <>
      <Header />
      <h2 className={style.title}>{`دسته بندی ${query.name}`}</h2>
      <span className="h-72 bg-white w-full block" />
    </>
  );
};

export default Categories;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    `${apiRoutes.ALL_CATEGORIES}${ctx.query.id}`
  );

  return {
    props: {
      data,
    },
  };
};
