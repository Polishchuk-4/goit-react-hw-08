import RegisterForm from "../../components/RegistrationForm/RegistrationForm";

import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <main className={css.main}>
      <RegisterForm />
    </main>
  );
}
