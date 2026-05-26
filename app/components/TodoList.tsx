"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { showToast } from "@/store/slices/toastSlice";
import { fetchTodos } from "@/services/todosService";
import type { Todo } from "@/types/todo";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        setTodos(data);
        dispatch(showToast({ message: t("toast.fetchSuccess"), type: "success" }));
      })
      .finally(() => setLoading(false));
  }, [dispatch, t]);

  return (
    <div>
      <h1 className={styles.header}>{t("home.title")}</h1>

      {loading && <p className={styles.status}>{t("home.loading")}</p>}

      {!loading && (
        <>
          <p className={styles.count}>
            {t("home.itemCount", { count: todos.length })}
          </p>
          {todos.length === 0 ? (
            <p className={styles.status}>{t("home.noTodos")}</p>
          ) : (
            <ul className={styles.list}>
              {todos.map((todo) => (
                <li key={todo._id} className={styles.item}>
                  <span className={`${styles.dot} ${todo.completed ? styles.dotDone : ""}`} />
                  <span className={`${styles.label} ${todo.completed ? styles.labelDone : ""}`}>
                    {todo.title}
                  </span>
                  <span className={styles.badge}>
                    {todo.completed ? t("todo.done") : t("todo.pending")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
