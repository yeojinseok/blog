import axios from "axios";

export type Post = {
  _id: string;
  title: string;
  _updatedAt: string;
  content: string;
  _createdAt: string;
  imageURL: string;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export async function getPosts(): Promise<{ post: Post[] } | undefined> {
  try {
    return axiosInstance.get("/api/posts").then((v) => v.data);
  } catch (err) {
    console.log(err);
  }
}

export async function getPostByID(postID: string): Promise<{ post: Post[] }> {
  const post = axiosInstance
    .get(`/api/post?postID=${postID}`)
    .then((v) => v.data);
  return post;
}
