import Header from "@/features/Header";
import { useRouter } from "next/router";

const Article = () => {
  const {
    query: { articleSlug },
  } = useRouter();

  return (
    <>
      <Header />
      <main>
        <h2>article page</h2>
      </main>
    </>
  );
};

export default Article;
