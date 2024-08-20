import { useDispatch, useSelector } from "react-redux";
import AddContactForm from "../../components/AddContactForm/AddContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import { selectIsLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <AddContactForm />
      <SearchBox />
      <ContactList />
      {isLoading && <Loader />}
    </div>
  );
}
