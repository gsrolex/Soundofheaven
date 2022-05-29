import Head from "next/head";
import Layout from "../components/layout/Layout";
import Heading from "../components/Heading";
import Background from "../public/images/backgoundPhotos/homeScreen.jpg";
import miniatu from "../public/images/Franco Serblin/accordo/miniaturizzare.png";
import Image_comp from "..//components/img/Image_comp";
import Footer from "../components/layout/Footer";
import styles from "../styles/Home.module.scss";
import { getNavigationStaticProps } from "../js/navigationStaticProps";
import Buttons from "../components/Button";
import Link from "next/link";

export default function Index({ brands }) {
  return (
    <div className="bg-dark">
      <Layout hideNavBarBg="true" brands={brands}>
        <Head title="HomePage" />
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

          <Heading
            className="centered_home_text font_x"
            id="font_x"
            content="PINNACLE OF MUSICALITY"
            color="white"
          />
          <Link href={"/contactus"}>
            <a>
              <Buttons
                className="centered_home_button btn btn-primary mt-3 hover_front"
                content="Kontakt oss!"
              ></Buttons>
            </a>
          </Link>
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
  return {
    props: {
      ...(await getNavigationStaticProps()),
    },
  };
}
