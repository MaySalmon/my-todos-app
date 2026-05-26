import type { Todo, CreateTodoInput } from "@/types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};
