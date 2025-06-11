export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type ErrorState<Payload> = {
  data: Payload;
  status: "loading" | "idle" | "succeeded" | "failed";
  error: string | null;
};

export type PostsState = ErrorState<Post[]>;

export type UsersState = ErrorState<User[]>;

export type TodosState = ErrorState<Todo[]>;
