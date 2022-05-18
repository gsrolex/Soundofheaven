import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Buttons from "./Button";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(3, "name must have 3 characters"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(3, "name must have 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),

  message: yup
    .string()
    .required("Please enter a message")
    .min(10, "message must have 10 characters"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  console.log(errors);

  return (
    <div>
      {" "}
      <div className="container">
        <div className="">
          <form className="form-group " onSubmit={handleSubmit(onSubmit)}>
            <label
              className="d-flex align-items-start"
              for="exampleFormControlTextarea1"
            >
              First name
            </label>
            <input className="form-control" {...register("firstName")} />
            {errors.firstName && (
              <span className="d-flex align-items-start text-danger">
                {errors.firstName.message}
              </span>
            )}
            <br />

            <label
              className="d-flex align-items-start"
              for="exampleFormControlTextarea1"
            >
              Last name
            </label>
            <input className="form-control" {...register("lastName")} />
            {errors.lastName && (
              <span className="d-flex align-items-start text-danger">
                {errors.lastName.message}
              </span>
            )}
            <br />
            <label
              className="d-flex align-items-start"
              for="exampleFormControlTextarea1"
            >
              Email
            </label>
            <input className="form-control" {...register("email")} />
            {errors.email && (
              <span className="d-flex align-items-start text-danger">
                {errors.email.message}
              </span>
            )}
            <br />
            <div class="form-group">
              <label
                className="d-flex align-items-start"
                for="exampleFormControlSelect1"
              >
                Subject
              </label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                <option>this one</option>
                <option>that one</option>
              </select>
              {errors.subject && (
                <span className="d-flex align-items-start text-danger">
                  {errors.subject.message}
                </span>
              )}
            </div>
            <br />
            <div className="form-group">
              <label
                className="d-flex align-items-start"
                for="exampleFormControlTextarea1"
              >
                Message
              </label>
              <textarea
                className="form-control"
                {...register("message")}
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
              {errors.message && (
                <span className="d-flex align-items-start text-danger">
                  {errors.message.message}
                </span>
              )}
            </div>
            <br />
            <button className="btn btn-success w-100">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
