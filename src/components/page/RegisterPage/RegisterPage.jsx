import { Field, Form, Formik } from "formik";
import css from "./RegisterPage.module.css";
import { useId } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../../redux/auth/operations";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const emailInputId = useId();
  const passwordInputId = useId();
  const nameInputId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(registerThunk(values));

    actions.resetForm();
  };
  return (
    <section className={css.formPage}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.formRow}>
            <label className={css.formLabel}>Name</label>
            <Field
              className={css.formInput}
              type="text"
              name="name"
              id={nameInputId}
            ></Field>
          </div>
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
            Register
          </button>
          <p>
            You already have account? <Link to="/login">Sign In</Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
}
