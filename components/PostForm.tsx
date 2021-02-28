import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Router from "next/router";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <br />
      {errors.title && "title is required"}
      <br />
      <input name="title" ref={register({ required: true })} />
      <br />
      <label>Content</label>
      <br />
      {errors.content && "content is required"}
      <br />
      <input name="content" ref={register({ required: true })} />
      <br />
      <input type="submit" />
    </form>
  );
}
