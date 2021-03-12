import React from "react";
import PostForm from "../../components/PostForm";
import "../../styles/Main.module.css";
import { usePost } from "../../components/context/PostContext";

export default function createPost(props) {
  const { getCurrentPost }: any = usePost();

  getCurrentPost();

  return (
    <div>
      <p>aaaa</p>
      {/* {props.title} */}
      {/* <PostForm /> */}
    </div>
  );
}
