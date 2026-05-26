import { getTodos, createTodo } from "@/lib/todos";
import type { CreateTodoInput } from "@/types/todo";

export const GET = async () => {
  const todos = await getTodos();
  return Response.json(todos);
};

export const POST = async (request: Request) => {
  const body = await request.json() as CreateTodoInput;
  const todo = await createTodo({ title: body.title, completed: body.completed ?? false });
  return Response.json(todo, { status: 201 });
};
