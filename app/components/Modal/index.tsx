"use client";

import type { ReactNode, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeModal, type ModalType } from "@/store/slices/modalSlice";
import AddTodoForm from "@/app/components/AddTodoForm";
import styles from "./Modal.module.css";

const MODAL_TITLES: Record<ModalType, string> = {
  ADD_TODO: "modal.addTodo.title",
};

const getModalContent = (modalType: ModalType): ReactNode => {
  switch (modalType) {
    case "ADD_TODO":
      return <AddTodoForm />;
  }
};

const Modal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);

  if (!isOpen || !modalType) return null;

  const handleOverlayClick = () => { dispatch(closeModal()); };
  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t(MODAL_TITLES[modalType])}</h2>
          <button className={styles.closeBtn} onClick={handleOverlayClick}>
            ✕
          </button>
        </div>
        <div className={styles.body}>{getModalContent(modalType)}</div>
      </div>
    </div>
  );
};

export default Modal;
