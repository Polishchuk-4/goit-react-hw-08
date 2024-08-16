import { Field, Form, Formik } from "formik";
import css from "./LoginPage.module.css";
import { useId } from "react";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const emailInputId = useId();
  const passwordInputId = useId();

  const handleSubmit = (values, actions) => {};
  return (
    <section className={css.formPage}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.formRow}>
            <label className={css.formLabel}>Email</label>
            <Field
              className={css.formInput}
              type="email"
              name="email"
              id={emailInputId}
            ></Field>
          </div>
          <div className={css.formRow}>
            <label className={css.formLabel}>Password</label>
            <Field
              className={css.formInput}
              type="password"
              name="password"
              id={passwordInputId}
            ></Field>
          </div>
          <button type="submit" className={css.formBtn}>
            Log In
          </button>
          <p>
            You dont have account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
}
