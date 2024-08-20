import style from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

import { BsFillTelephoneFill } from "react-icons/bs";
import clsx from "clsx";
import { useState } from "react";

import ModalDelete from "../ModalDelete/ModalDelete";
import FormEditContact from "../FormEditContact/FormEditContact";

export default function Contact({ contact: { id, name, number } }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const openForm = () => setIsOpenForm(true);
  const closeForm = () => setIsOpenForm(false);

  return (
    <div className={style.contact}>
      <div className={style.contactColumn}>
        <p className={style.contactText}>
          <FaUser className={style.contactIcon} />
          {name}
        </p>
        <p className={style.contactText}>
          <BsFillTelephoneFill className={style.contactIcon} />
          {number}
        </p>
      </div>
      <button className={clsx(style.contactBtn, style.contactBtnEdit)}>
        <CiEdit className={style.contactIconEdit} onClick={openForm} />
      </button>
      <button className={style.contactBtn} onClick={openModal}>
        Delete
      </button>
      {isOpenForm && (
        <FormEditContact
          id={id}
          name={name}
          number={number}
          closeForm={closeForm}
        />
      )}
      {isOpenModal && (
        <ModalDelete
          id={id}
          name={name}
          number={number}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
