import style from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  function handleDelete(userId) {
    dispatch(deleteContact(userId))
      .unwrap()
      .then(() => {
        toast("Successfully delete contact", {
          icon: "✅",
          duration: 1000,
        });
      })
      .catch(() => {
        toast("Sorry, not successfully delete contact", {
          icon: "❌",
          duration: 1000,
        });
      });
  }

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
      <button className={style.contactBtn} onClick={() => handleDelete(id)}>
        Delete
      </button>
      <Toaster />
    </div>
  );
}
