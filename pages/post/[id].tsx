import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import styles from "../../styles/Main.module.css";
import { Post } from "./../../data/posts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const matchedPost = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  const matchedPostJson = JSON.parse(JSON.stringify(matchedPost));
  return {
    props: {
      post: matchedPostJson,
    },
  };
};

const deletePost = async (id: number): Promise<void> => {
  const result: boolean = window.confirm("削除してもよろしいですか?");

  if (result) {
    await fetch(`http://localhost:3000/api/post/${id}`, {
      method: "DELETE",
    });
    Router.push("/");
  }
};

interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-2/4 flex flex-col break-all">
        <h1 className="text-4xl font-semibold text-center my-5">
          {props.post.title}
        </h1>
        <p>{props.post.content}</p>
        <div className="w-full flex justify-end">
          <button
            className="bg-red-500 text-white w-1/4 my-10 rounded-lg"
            onClick={() => deletePost(props.post.id)}
          >
            Delete Post
          </button>
        </div>
        <br />
        <Link href="/">
          <a className="text-center">Topへ</a>
        </Link>
      </div>
    </div>
  );
};

export default PostPage;
