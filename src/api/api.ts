import type { Post } from "../models";

const getUsers = () => fetch("https://jsonplaceholder.typicode.com/users");

const getPostsByUserId = (id: number | string | undefined) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

const deletePostById = (id: number | string | undefined) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });

const updatePost = (post: Post) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });

const getTodos = () => fetch("https://jsonplaceholder.typicode.com/todos");

export default {
  getUsers,
  getPostsByUserId,
  getTodos,
  updatePost,
  deletePostById,
};
