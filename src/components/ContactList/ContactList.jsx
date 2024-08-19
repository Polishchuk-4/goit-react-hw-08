import { useSelector } from "react-redux";

import style from "./ContactList.module.css";
import ContactForm from "../ContactForm/ContactForm";
import { selectVisibleContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <ul className={style.contacts}>
      {visibleContacts.map((contact) => (
        <li className={style.contactsItem} key={contact.id}>
          <ContactForm contact={contact} />
        </li>
      ))}
    </ul>
  );
}
