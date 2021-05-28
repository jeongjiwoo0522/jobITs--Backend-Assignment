import { User } from "../../interface/user/user";
import { Post } from "../../interface/post/post";

export const dummyPost: Post = {
  id: "dummyPost1",
  title: "testPost",
  content: "...",
  user: {} as User
};

export  const dummyPostCatalog: Array<Post> = [
  {
    id: "dummyPost1",
    title: "testPost",
    content: "...",
    user: {} as User
  }, 
  {
    id: "dummyPost2",
    title: "Hello World!\n",
    content: "....",
    user: {} as User
  }, 
  {
    id: "dummyPost3",
    title: "typescript",
    content: "......",
    user: {} as User,
  }
];