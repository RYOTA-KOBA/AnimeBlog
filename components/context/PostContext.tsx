import React, { useContext, useState, ReactNode } from "react";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

type postContextType = {
  getCurrentPost: () => void;
};

function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  const useCtx = () => {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  };
  return [useCtx, ctx.Provider] as const;
}

export const [usePost, SetPostProvider] = createCtx<postContextType>();

export const PostProvider: React.FC = (props) => {
  const post = usePostCtx();
  return <SetPostProvider value={post}>{props.children}</SetPostProvider>;
};

export const usePostCtx: any = () => {
  const getCurrentPost = async () => {
    console.log("Hello!!");
  };
  return { getCurrentPost };
};
