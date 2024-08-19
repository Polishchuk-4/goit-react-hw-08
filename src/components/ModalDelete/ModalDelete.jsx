import { useDispatch } from "react-redux";
import css from "./ModalDelete.module.css";
import { deleteContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";

export default function ModalDelete({ id, name, number, closeModal }) {
  const dispatch = useDispatch();

  function handleCloseModal() {
    closeModal();
  }
  function handleDelete() {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        closeModal();
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
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        Are you sure
        <br />
        to delete contact?
        <div className={css.contact}>
          <p>Name: {name}</p>
          <p>Number: {number}</p>
        </div>
        <div className={css.btnRow}>
          <button className={css.btn} onClick={handleCloseModal}>
            No
          </button>
          <button className={css.btn} onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
