"use client";

import { useFormik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { closeModal } from "@/store/slices/modalSlice";
import { addTodo } from "@/store/slices/todosSlice";
import { showToast } from "@/store/slices/toastSlice";
import { createTodo } from "@/services/todosService";
import type { CreateTodoInput } from "@/types/todo";
import styles from "./AddTodoForm.module.css";

const AddTodoForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const formik = useFormik<CreateTodoInput>({
    initialValues: { title: "", completed: false },
    validationSchema: Yup.object({
      title: Yup.string().trim().required(t("form.titleRequired")),
    }),
    onSubmit: async (
      values: CreateTodoInput,
      { setSubmitting }: FormikHelpers<CreateTodoInput>
    ) => {
      try {
        const newTodo = await createTodo(values);
        dispatch(addTodo(newTodo));
        dispatch(closeModal());
        dispatch(showToast({ message: t("toast.addSuccess"), type: "success" }));
      } catch {
        dispatch(showToast({ message: t("toast.addError"), type: "error" }));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          {t("form.title")}
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder={t("form.titlePlaceholder")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className={styles.input}
        />
        {formik.touched.title && formik.errors.title && (
          <p className={styles.error}>{formik.errors.title}</p>
        )}
      </div>

      <div className={styles.checkboxField}>
        <input
          id="completed"
          name="completed"
          type="checkbox"
          onChange={formik.handleChange}
          checked={formik.values.completed}
          className={styles.checkbox}
        />
        <label htmlFor="completed" className={styles.checkboxLabel}>
          {t("form.completed")}
        </label>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => dispatch(closeModal())}
          className={styles.cancelBtn}
        >
          {t("form.cancel")}
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={styles.submitBtn}
        >
          {formik.isSubmitting ? t("form.saving") : t("form.save")}
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
