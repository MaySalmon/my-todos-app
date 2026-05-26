"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { hideToast } from "@/store/slices/toastSlice";
import type { ToastType } from "@/store/slices/toastSlice";
import styles from "./Toast.module.css";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, visible, type } = useAppSelector((state) => state.toast);

  useEffect(() => {
    if (!visible) return;
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => dispatch(hideToast()),
      3000
    );
    return () => clearTimeout(timer);
  }, [visible, dispatch]);

  const typeClass: ToastType = type;

  return (
    <div className={`${styles.toast} ${styles[typeClass]} ${!visible ? styles.hidden : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
