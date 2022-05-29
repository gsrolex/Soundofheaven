import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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

  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),

  message: yup
    .string()
    .required("Please enter a message")
    .min(10, "message must have 10 characters"),
});

const Result = () => {
  return <span className="text-info ">Meldingen er sendt! Takk</span>;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {}
  const [result, showResult] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0cwtjgo",
        "template_cxah29e",
        form.current,
        "no3-QHO0yu8UYjScf"
      )
      .then(
        (result) => {},
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    showResult(true);
  };

  console.log(errors);

  setTimeout(() => {
    showResult(false);
  }, 3000);

  return (
    <div>
      <div className="container">
        <div className="">
          <form
            className="form-group "
            ref={form}
            onSubmit={handleSubmit(onSubmit) && sendEmail}
          >
            <label
              className="d-flex align-items-start"
              htmlFor="exampleFormControlTextarea1"
            >
              First name
            </label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="d-flex align-items-start text-danger">
                {errors.firstName.message}
              </span>
            )}
            <br />

            <label
              className="d-flex align-items-start"
              htmlFor="exampleFormControlTextarea1"
            >
              Last name
            </label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="d-flex align-items-start text-danger">
                {errors.lastName.message}
              </span>
            )}
            <br />
            <label
              className="d-flex align-items-start"
              htmlFor="exampleFormControlTextarea1"
            >
              Email
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="d-flex align-items-start text-danger">
                {errors.email.message}
              </span>
            )}
            <br />

            <label
              className="d-flex align-items-start"
              htmlFor="exampleFormControlTextarea1"
            >
              Telefon Nummer
            </label>
            <input
              className="form-control"
              type="text"
              name="phoneNumber"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="d-flex align-items-start text-danger">
                {errors.phoneNumber.message}
              </span>
            )}
            <br />

            <div className="form-group">
              <label
                className="d-flex align-items-start"
                htmlFor="exampleFormControlTextarea1"
              >
                Message
              </label>
              <textarea
                className="form-control"
                name="message"
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

            <button
              type="submit"
              value="Send"
              className="btn btn-success w-100"
            >
              Send
            </button>
            <div className="p-3">{result ? <Result></Result> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
