"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTodos } from "@/store/slices/todosSlice";
import { showToast } from "@/store/slices/toastSlice";
import { openModal } from "@/store/slices/modalSlice";
import { fetchTodos } from "@/services/todosService";
import type { Todo } from "@/types/todo";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector((state) => state.todos.items);
  const loading: boolean = useAppSelector((state) => state.todos.loading);

  useEffect(() => {
    fetchTodos().then((data: Todo[]) => {
      dispatch(setTodos(data));
      dispatch(showToast({ message: t("toast.fetchSuccess"), type: "success" }));
    });
  }, [dispatch, t]);

  return (
    <div>
      <h1 className={styles.header}>{t("home.title")}</h1>

      <div className={styles.topBar}>
        <p className={styles.count}>
          {loading ? "" : t("home.itemCount", { count: todos.length })}
        </p>
        <button
          className={styles.addBtn}
          onClick={() => dispatch(openModal({ modalType: "ADD_TODO" }))}
        >
          {t("home.addButton")}
        </button>
      </div>

      {loading && <p className={styles.status}>{t("home.loading")}</p>}

      {!loading && todos.length === 0 && (
        <p className={styles.status}>{t("home.noTodos")}</p>
      )}

      {!loading && todos.length > 0 && (
        <ul className={styles.list}>
          {todos.map((todo: Todo) => (
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
    </div>
  );
};

export default TodoList;
