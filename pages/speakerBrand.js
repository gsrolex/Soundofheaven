import Head from "next/head";
import Layout from "../public/components/layout/Layout";
import Heading from "../public/components/Heading";
import axios from "axios";
import Image_comp from "../public/components/img/Image_comp";
import Franco_logo from "../public/images/Franco Serblin/logo.png";
import Xavian from "../public/images/Xavian/eshop-terza-header.png";
import Accordo from "../public/images/Franco Serblin/accordo/accordo_parallax.png";
import Atohm from "../public/images/Atohm/atohm.png";
import Atohm_logo from "../public/images/Atohm/logo.png";
import Footer from "../public/components/layout/Footer";
import Link from "next/link";

/* import { BASE_URL } from "../api/api"; */

export default function Index({ users }) {
  console.log(users);

  return (
    <div className="bg-dark">
      <Layout>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>
      <div className="container min-vh-100 ">
        <div className="container SpeakerBrand_container">
          <div className="row ">
            <Link href="/model">
              <div className="col-12 text_container">
                <Image_comp
                  className="SpeakerBrandImg "
                  layout="raw"
                  src={Accordo}
                  alt="home photo"
                />
                <Image_comp
                  className="centered_text franco_logo"
                  layout="raw"
                  src={Franco_logo}
                  alt="home photo"
                />
              </div>
            </Link>
          </div>
          <div className="row">
            <Link href="/">
              <div className="col-12 text_container">
                <Image_comp
                  className="SpeakerBrandImg "
                  layout="raw"
                  src={Atohm}
                  alt="home photo"
                />
                <Image_comp
                  className="centered_text "
                  layout="raw"
                  src={Atohm_logo}
                  alt="home photo"
                />
              </div>
            </Link>
          </div>
          <div className="row">
            <Link href="/">
              <div className="col-12 text_container">
                <Image_comp
                  className="SpeakerBrandImg "
                  layout="raw"
                  src={Xavian}
                  alt="home photo"
                />
              </div>
            </Link>
          </div>
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
