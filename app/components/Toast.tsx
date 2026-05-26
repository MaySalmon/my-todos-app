"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { hideToast } from "@/store/slices/toastSlice";
import styles from "./Toast.module.css";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, visible, type } = useAppSelector((state) => state.toast);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => dispatch(hideToast()), 3000);
    return () => clearTimeout(timer);
  }, [visible, dispatch]);

  return (
    <div className={`${styles.toast} ${styles[type]} ${!visible ? styles.hidden : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
