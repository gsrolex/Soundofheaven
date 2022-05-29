import Heading from "../components/Heading";
import { logout } from "../serv/worker";
import Layout from "../components/layout/Layout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Layout></Layout>
      <div className="container-fluid d-flex p-5 justify-content-center flex-column cont_button">
        <Heading className="text-center p-5 " content="Login" color="black" />
        <Link href="/">
          <button
            onClick={logout}
            className="btn-dark text-light rounded-pill nav-item nav-link w-50 mx-auto "
          >
            Logout
          </button>
        </Link>

        <Link href="/adminEmail">
          <button className="btn-dark text-light rounded-pill nav-item nav-link w-50 mx-auto mt-5">
            Email
          </button>
        </Link>
        <Link href="/adminPost">
          <button className="btn-dark text-light rounded-pill nav-item nav-link w-50 mx-auto mt-5">
            Post
          </button>
        </Link>
      </div>
    </>
  );
}
