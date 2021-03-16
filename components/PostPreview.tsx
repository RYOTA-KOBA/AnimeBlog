import React from "react";
import ReactMarkdown from "react-markdown";

const PostPreview = (props) => {
  return (
    <div className="h-full w-1/2 mr-10">
      <div className="markdown-preview h-4/6 w-full border shadow-xl mb-5 rounded-xl py-4 px-2 overflow-y-scroll bg-white">
        {props.markdown}
      </div>
    </div>
  );
};

export default PostPreview;
