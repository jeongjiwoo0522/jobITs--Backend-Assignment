import { Admin, Post } from "../../interface";

export const dummyPost: Post = {
  id: "dummyPost1",
  title: "testPost",
  content: "...",
  user: {} as Admin
};

export  const dummyPostCatalog: Array<Post> = [
  {
    id: "dummyPost1",
    title: "testPost",
    content: "...",
    user: {} as Admin
  }, 
  {
    id: "dummyPost2",
    title: "Hello World!\n",
    content: "....",
    user: {} as Admin
  }, 
  {
    id: "dummyPost3",
    title: "typescript",
    content: "......",
    user: {} as Admin,
  }
];