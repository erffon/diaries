import Header from "@/features/Header";
import { useRouter } from "next/router";
import style from "./Post.module.css";

const Article = () => {
  const {
    query: { articleId },
  } = useRouter();

  return (
    <>
      <Header />
      <main className="font-salel h-screen">
        <h2 className={style.title}>title of the post</h2>
        <div className={style["post-metadata"]}>
          <button>tag</button>
          <p>20 march 2023</p>
        </div>
        <p className={style.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
          corporis minus porro assumenda ab, mollitia blanditiis sint quidem,
          doloremque illum molestias dicta, laboriosam aliquid maxime unde
          corrupti! Reprehenderit, iusto quae! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Perferendis corporis minus porro
          assumenda ab, mollitia blanditiis sint quidem, doloremque illum
          molestias dicta, laboriosam aliquid maxime unde corrupti!
          Reprehenderit, iusto quae! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Perferendis corporis minus porro assumenda ab,
          mollitia blanditiis sint quidem, doloremque illum molestias dicta,
          laboriosam aliquid maxime unde corrupti! Reprehenderit, iusto quae!
        </p>
      </main>
    </>
  );
};

export default Article;
