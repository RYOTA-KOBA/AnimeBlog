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
      <h1 className="text-2xl font-semibold">{props.post.title}</h1>
      <p>{props.post.content}</p>
      <button
        className={styles.deleteButton}
        onClick={() => deletePost(props.post.id)}
      >
        Delete Post
      </button>
      <br />
      <Link href="/">
        <a>Topへ</a>
      </Link>
    </div>
  );
};

export default PostPage;
