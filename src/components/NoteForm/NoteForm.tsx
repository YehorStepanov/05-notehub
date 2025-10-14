import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import type { AddNoteFormValue} from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
  addNote: (note: AddNoteFormValue) =>void;
}

const initialValues: AddNoteFormValue ={
  title: '',
  content: '',
  tag: "Todo"
}

export default function NoteForm({ onClose, addNote }: NoteFormProps) {
  const handleSubmit = (
    values: AddNoteFormValue,
    actions: FormikHelpers<AddNoteFormValue>
  ) => {
    addNote(values);
    actions.resetForm();
    onClose();
  };
  const AddNoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  content: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(1000, "Name is too long")
    .required("wf"),
  tag: Yup.string()
  .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag value")
  .required("Tag is required")
});
  const fieldId = useId();
  return (
    <Formik validationSchema={AddNoteFormSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name={`title`} className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name={`content`} className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field as='select' id={`${fieldId}-tag`} name='tag' className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component='span' name={`tag`} className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
