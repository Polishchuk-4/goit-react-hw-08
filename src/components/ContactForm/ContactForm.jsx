import style from "./ContactForm.module.css";
import { FaUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { editingContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalDelete from "../ModalDelete/ModalDelete";

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

export default function ContactForm({ contact: { id, name, number } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const dispatch = useDispatch();

  const initialValues = {
    name: name,
    number: number,
  };

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleSubmit(values, actions) {
    console.log(values);
    dispatch(editingContact({ id, ...values }))
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
    setIsEditing(!isEditing);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={style.contact}>
          <div className={style.contactColumn}>
            <p className={style.contactText}>
              <FaUser className={style.contactIcon} />
              <Field
                className={clsx(style.input, isEditing && style.inputActive)}
                type="text"
                name="name"
                disabled={!isEditing}
              />
            </p>
            <ErrorMessage
              name="name"
              component="span"
              className={style.contactFormErrorSpan}
            />
            <p className={style.contactText}>
              <BsFillTelephoneFill className={style.contactIcon} />
              <Field
                className={clsx(style.input, isEditing && style.inputActive)}
                type="text"
                name="number"
                disabled={!isEditing}
              />
            </p>
            <ErrorMessage
              name="number"
              component="span"
              className={style.contactFormErrorSpan}
            />
          </div>
          <button
            type="button"
            className={clsx(style.contactBtn, style.contactBtnEdit)}
            onClick={() => handleEdit()}
          >
            <CiEdit className={style.contactIconEdit} />
          </button>
          <button
            type={isEditing ? "submit" : "button"}
            className={style.contactBtn}
            disabled={isEditing}
            onClick={() => {
              if (!isEditing) {
                // handleDelete(id);
                openModal();
              }
              console.log("log");
            }}
          >
            {isEditing ? "Save" : "Delete"}
          </button>

          <Toaster />
        </Form>
      </Formik>
      {isOpenModal && (
        <ModalDelete
          id={id}
          name={name}
          number={number}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
