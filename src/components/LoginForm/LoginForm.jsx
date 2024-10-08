import { Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";
import { useId } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const emailInputId = useId();
  const passwordInputId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(loginThunk(values));
    actions.resetForm();
  };

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
