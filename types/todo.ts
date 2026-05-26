export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type CreateTodoInput = {
  title: string;
  completed: boolean;
};
