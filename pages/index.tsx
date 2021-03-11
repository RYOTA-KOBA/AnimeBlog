import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Main.module.css";
import { Post } from "./../data/posts";
import { PrismaClient } from "@prisma/client";

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const data = await prisma.post.findMany();
  const posts = JSON.parse(JSON.stringify(data));
  return {
    props: {
      posts,
    },
  };
};

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prisma Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Blog!</h1>
        <div className={styles.grid}>
          {props.posts.map((p: Post) => {
            return (
              <Link href={`/post/${p.id}`} key={p.id}>
                <a className={styles.card}>
                  <h3>{p.title} &rarr;</h3>
                  <p>{p.content}</p>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
      <Link href="/post/createPost">
        <a>投稿を作成する</a>
      </Link>
    </div>
  );
};

export default Home;
