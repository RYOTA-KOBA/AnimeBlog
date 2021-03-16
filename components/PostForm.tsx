import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Router from "next/router";
import "../styles/Main.module.css";
import Link from "next/link";
import PostPreview from "./PostPreview";

interface IFormInput {
  title: String;
  content: String;
}

export default function PostForm() {
  const { register, errors, handleSubmit } = useForm<IFormInput>();
  const [markdown, setMarkdown] = useState();

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

  const setData = (e: any) => {
    e.preventDefault();

    setMarkdown(e.target.value);
    console.log(markdown);
  };

  return (
    <div className="post-form">
      <h1 className="text-center font-bold text-4xl py-10">投稿を作成</h1>
      <div className="editor h-screen pt-5 flex justify-between">
        <form className="h-full w-1/2 ml-10 text-center">
          {/* <input type="text" /> */}
          <textarea
            name="md"
            id="md"
            placeholder="Markdownで記述"
            className="markdown-form resize-none w-full h-4/6 border shadow-xl mb-5 rounded-xl focus:outline-none py-4 px-2"
            // ref={markdownRef}
            value={markdown}
            onChange={setData}
          ></textarea>
          <input
            type="submit"
            className="submit-post w-36 h-10 my-8 rounded-md font-bold"
          />
        </form>
        <PostPreview markdown={markdown} />
      </div>
    </div>
  );
}
