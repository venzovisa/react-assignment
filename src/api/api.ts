import type { Post } from "../models";

const api = "https://jsonplaceholder.typicode.com";

const getUsers = () => fetch(`${api}/users`);

const getPostsByUserId = (id: number | string | undefined) =>
  fetch(`${api}/posts?userId=${id}`);

const deletePostById = (id: number | string | undefined) =>
  fetch(`${api}/posts/${id}`, {
    method: "DELETE",
  });

const updatePost = (post: Post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });

const getTodos = () => fetch(`${api}/todos`);

export default {
  getUsers,
  getPostsByUserId,
  getTodos,
  updatePost,
  deletePostById,
};
