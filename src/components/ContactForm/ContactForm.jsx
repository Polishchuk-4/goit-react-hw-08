import style from "./ContactForm.module.css";
import { FaUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, editingContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalDelete from "../ModalDelete/ModalDelete";
import {
  selectEditingStateById,
  selectEditingStates,
  selectIsOpenModal,
} from "../../redux/contacts/selectors";
import { startEditing, stopEditing } from "../../redux/contacts/slice";

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
  const dispatch = useDispatch();

  const isOpenModal = useSelector(selectIsOpenModal);
  const editingContactState = useSelector((state) =>
    selectEditingStateById(id)(state)
  );

  const initialValues = {
    name: name,
    number: number,
  };

  function handleEdit() {
    if (!editingContactState.editing) {
      dispatch(startEditing(id));
      console.log(editingContactState);
    }
  }
  function handleDelete() {
    dispatch(deleteContact(id));
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
    dispatch(stopEditing(id));
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
                className={clsx(
                  style.input,
                  editingContactState.editing && style.inputActive
                )}
                type="text"
                name="name"
                disabled={!editingContactState.editing}
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
                className={clsx(
                  style.input,
                  editingContactState.editing && style.inputActive
                )}
                type="text"
                name="number"
                disabled={!editingContactState.editing}
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
            type={editingContactState.editing ? "submit" : "button"}
            className={style.contactBtn}
            // disabled={!editingContactState.editing}
            onClick={() => {
              if (editingContactState.editing) {
                console.log("btn");
              } else {
                handleDelete();
                console.log("delet");
              }
            }}
          >
            {editingContactState.editing ? "Save" : "Delete"}
          </button>

          <Toaster />
        </Form>
      </Formik>
      {isOpenModal && <ModalDelete id={id} name={name} number={number} />}
    </>
  );
}
