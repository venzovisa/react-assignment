const getUsers = () => fetch("https://jsonplaceholder.typicode.com/users");

const getPostsByUserId = (id: number | string | undefined) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

const getTodos = () => fetch("https://jsonplaceholder.typicode.com/todos");

export default {
  getUsers,
  getPostsByUserId,
  getTodos,
};
