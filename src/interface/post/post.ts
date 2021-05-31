import { Admin } from "../admin/admin";

export interface Post {
  id: string;
  title: string;
  content: string;
  user: Omit<Admin, "role" | "posts">;
}