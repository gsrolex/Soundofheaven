import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Heading from "./Heading";

import { brukerData } from "../serv/worker";

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return brukerData
      .login(username, password)
      .then(() => {
        router.push("/admin");
      })
      .catch((error) => {
        setError("apiError", { message: error });
      });
  }

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card bg-dark text-light">
        <Heading
          className="homeHeading text-light p-3"
          content="Login"
          color="black"
        />
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-success w-100 mt-3"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            {errors.apiError && (
              <div className="alert alert-danger mt-3 mb-0">
                {errors.apiError?.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
