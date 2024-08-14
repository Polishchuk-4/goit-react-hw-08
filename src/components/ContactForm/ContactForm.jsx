import { useId } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

import style from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsOps";
import toast, { Toaster } from "react-hot-toast";

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

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm() {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast("Successfully add contact", {
          icon: "✅",
          duration: 1000,
        });
      })
      .catch(() => {
        toast("Sorry, not successfully add contact", {
          icon: "❌",
          duration: 1000,
        });
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={style.contactForm}>
        <div className={style.contactFormRow}>
          <label htmlFor={nameFieldId} className={style.contactFormLabel}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            className={style.contactFormInput}
            id={nameFieldId}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={style.contactFormErrorSpan}
          />
        </div>
        <div className={style.contactFormRow}>
          <label htmlFor={numberFieldId} className={style.contactFormLabel}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            className={style.contactFormInput}
            id={numberFieldId}
          />
          <ErrorMessage
            name="number"
            component="span"
            className={style.contactFormErrorSpan}
          />
        </div>
        <button type="submit" className={style.contactFormBtn}>
          Add contact
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
}
