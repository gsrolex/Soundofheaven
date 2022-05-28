import Heading from "../components/Heading";
import LoginForm from "../components/loginForm";
import Layout from "../components/layout/Layout";

export default function LoginPage() {
  return (
    <>
      <Layout />
      <div className="container, cont_button">
        <Heading className="homeHeading" content="Home" color="black" />
      </div>
      <LoginForm />
    </>
  );
}
