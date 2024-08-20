import { useId } from "react";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";

import css from "./FormEditContact.module.css";
import { useDispatch } from "react-redux";
import { editingContact } from "../../redux/contacts/operations";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  number: Yup.string()
    .matches(/^[0-9-]*$/, "Only digits and dashes are allowed!")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required!"),
});

export default function FormEditContact({ id, name, number, closeForm }) {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  function handleSubmit(values, actions) {
    dispatch(editingContact({ id, ...values }))
      .unwrap()
      .then(() => {
        closeForm();
        toast("Successfully change contact", {
          icon: "✅",
          duration: 1000,
        });
      })
      .catch(() => {
        toast("Sorry, not successfully change contact", {
          icon: "❌",
          duration: 1000,
        });
      });
  }

  return (
    <div className={css.formOverlay}>
      <Formik
        initialValues={{ name: name, number: number }}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.formEditContact}>
          <h3 className={css.title}>Edit contact</h3>
          <div className={css.row}>
            <label htmlFor={nameFieldId} className={css.label}>
              Name
            </label>
            <Field
              type="text"
              name="name"
              className={css.input}
              id={nameFieldId}
            />
            <ErrorMessage name="name" component="span" className={css.span} />
          </div>
          <div className={css.row}>
            <label htmlFor={numberFieldId} className={css.label}>
              Number
            </label>
            <Field
              type="text"
              name="number"
              className={css.input}
              id={numberFieldId}
            />
            <ErrorMessage name="number" component="span" className={css.span} />
          </div>
          <div className={css.btnRow}>
            <button type="button" className={css.btn} onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className={css.btn}>
              Save
            </button>
          </div>
          <Toaster />
        </Form>
      </Formik>
    </div>
  );
}
