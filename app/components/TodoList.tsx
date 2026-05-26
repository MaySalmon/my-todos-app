import { type Todo } from "@/lib/todos";

type Props = {
  todos: Todo[];
};

const TodoList = ({ todos }: Props) => {
  if (todos.length === 0) {
    return <p className="text-zinc-500 text-sm">No todos yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <span
            className={`h-4 w-4 shrink-0 rounded-full border-2 ${
              todo.completed
                ? "border-green-500 bg-green-500"
                : "border-zinc-400"
            }`}
          />
          <span
            className={`flex-1 text-sm ${
              todo.completed
                ? "line-through text-zinc-400"
                : "text-zinc-800 dark:text-zinc-100"
            }`}
          >
            {todo.title}
          </span>
          <span className="text-xs text-zinc-400">
            {todo.completed ? "Done" : "Pending"}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
