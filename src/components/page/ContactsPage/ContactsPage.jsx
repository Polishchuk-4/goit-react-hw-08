import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../ContactForm/ContactForm";
import ContactList from "../../ContactList/ContactList";
import SearchBox from "../../SearchBox/SearchBox";
import Loader from "../../Loader/Loader";
import { selectIsLoading } from "../../../redux/contacts/selectors";
import { fetchContacts } from "../../../redux/contacts/operations";
import { useEffect } from "react";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <>
      ContactsPage
      <ContactForm />
      <SearchBox />
      <ContactList />
      {isLoading && <Loader />}
    </>
  );
}
