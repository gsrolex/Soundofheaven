import Heading from "../components/Heading";
import { logout } from "../serv/service";
import Layout from "../components/layout/Layout";
import Link from "next/link";

export default function LoginPage({ products, history }) {
  return (
    <>
      <Layout></Layout>
      <div className="container-fluid d-flex  justify-content-center flex-column cont_button">
        <Heading className="text-center p-5 " content="Home" color="black" />
        <Link href="/">
          <button onClick={logout} className="nav-item nav-link w-50 mx-auto ">
            Logout
          </button>
        </Link>

        <Link href="/adminEmail">
          <button className="nav-item nav-link w-50 mx-auto mt-5">Email</button>
        </Link>
        <Link href="/adminPost">
          <button className="nav-item nav-link w-50 mx-auto mt-5">Post</button>
        </Link>
      </div>
    </>
  );
}
