import Head from "next/head";
import Layout from "../public/components/layout/Layout";
import Heading from "../public/components/Heading";
import axios from "axios";
import Background from "../public/images/backgoundPhotos/homeScreen.jpg";
import miniatu from "../public/images/Franco Serblin/accordo/miniaturizzare.png";
import Image_comp from "../public/components/img/Image_comp";
import Footer from "../public/components/layout/Footer";
import Buttons from "../public/components/Button";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

/* import styles from "./Home.module.scss"; */

/* import { BASE_URL } from "../api/api"; */

export default function Index({ users }) {
  console.log(users);

  return (
    <div className="bg-dark">
      <Layout hideNavBarBg="true">
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>

      <div className={`container-fluid padding p-0 ${styles.margintop}`}>
        <div className="container_fluid container_home_text p-0 ">
          <div>
            <Image_comp
              className="FrontPageImg "
              layout="raw"
              src={Background}
              alt="home photo"
            />
          </div>
          <Link href="/speakerBrand">
            <a>
              <Buttons
                className="centered_home_button btn btn-success btn-lg button-83 shadow"
                content="PRODUKTER"
                color="white"
              ></Buttons>
            </a>
          </Link>
          <Heading
            className="centered_home_text font_x"
            id="font_x"
            content="PINNACLE OF MUSICALITY"
            color="white"
          />
        </div>
      </div>
      <div className="container-fluid bg-dark home_second_box d-flex justify-content-center">
        <div className="col-10 p-5 d-flex justify-content-center home_second_box">
          <Image_comp
            className=""
            objectFit="contain"
            src={miniatu}
            alt="home photo"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps() {
  let users = [];

  try {
    const response = await axios.get(BASE_URL);

    console.log("response", response.data);

    users = response.data;
  } catch (error) {
    console.log(error);
  }

  console.log("users", users);

  return {
    props: {
      users: users,
    },
  };
}
