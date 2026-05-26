import { getTodos } from "@/lib/todos";
import TodoList from "@/app/components/TodoList";

const Home = async () => {
  const todos = await getTodos();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <main className="w-full max-w-xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          My Todo List
        </h1>
        <p className="mb-8 text-sm text-zinc-500">
          {todos.length} item{todos.length !== 1 ? "s" : ""}
        </p>
        <TodoList todos={todos} />
      </main>
    </div>
  );
};

export default Home;
