import { useSelector } from "react-redux";

import style from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { selectVisibleContacts } from "../../redux/selectors";

export default function ContactList() {
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <ul className={style.contacts}>
      {visibleContacts.map((contact) => (
        <li className={style.contactsItem} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
