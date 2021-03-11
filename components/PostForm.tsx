import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Router from "next/router";
import "../styles/Main.module.css";
import Link from "next/link";

interface IFormInput {
  title: String;
  content: String;
}

export default function PostForm() {
  const { register, errors, handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const res = await fetch("/api/createPost", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.ok) {
      Router.push("/");
    } else {
      alert(JSON.stringify(json));
    }
  };

  return (
    <>
      <h1 className="post-form-header">投稿を作成</h1>
      <div className="post-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="post-form-inner">
            <label>Title</label>
            <br />
            {errors.title && (
              <p className="err-msg">タイトルの入力は必須です。</p>
            )}
            <input
              className="title"
              name="title"
              ref={register({ required: true })}
              type="text"
            />
            <br />
            <label>Content</label>
            <br />
            {errors.content && (
              <p className="err-msg">本文の入力は必須です。</p>
            )}
            <textarea
              className="content"
              name="content"
              ref={register({ required: true })}
            />
            <br />
            <button className="submit-btn rounded-lg" type="submit">
              送信
            </button>
          </div>
        </form>
      </div>
      <div className="toplink">
        <Link href="/">
          <a>Topへ</a>
        </Link>
      </div>
    </>
  );
}
