import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import type { Todo } from "@/types/todo";

type TodoDoc = {
  _id: ObjectId;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB ?? "todo-app");
  return db.collection<TodoDoc>("todos");
};

export const getTodos = async (): Promise<Todo[]> => {
  const collection = await getCollection();
  const docs = await collection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    _id: doc._id.toString(),
    title: doc.title,
    completed: doc.completed,
    createdAt: doc.createdAt.toISOString(),
  }));
};
