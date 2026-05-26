import type { Todo } from "@/types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};
