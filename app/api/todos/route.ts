import { getTodos } from "@/lib/todos";

export const GET = async () => {
  const todos = await getTodos();
  return Response.json(todos);
};
