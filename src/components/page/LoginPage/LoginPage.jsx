import { Field, Form, Formik } from "formik";
import css from "./LoginPage.module.css";
import { useId } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../redux/auth/operations";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const emailInputId = useId();
  const passwordInputId = useId();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (values, actions) => {
    dispatch(loginThunk(values));
    actions.resetForm();
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
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
