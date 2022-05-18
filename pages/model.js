import Head from "next/head";
import Layout from "../public/components/layout/Layout";
import Heading from "../public/components/Heading";
import axios from "axios";
/* import Model_comp from "../public/components/Model_comp.Js"; */
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Footer from "../public/components/layout/Footer";
import Image_comp from "../public/components/img/Image_comp";
import accordo_essence from "../public/images/Franco Serblin/accordo_essence/accordo_essence.png";
import accordo_essence_logo from "../public/images/Franco Serblin/accordo_essence/accordo_essence_logo_white.png";
import accordo from "../public/images/Franco Serblin/accordo/accordo.png";
import accordo_logo from "../public/images/Franco Serblin/accordo/accordo_logo_white.png";
import ktema from "../public/images/Franco Serblin/ktema/ktema.png";
import ktema_logo from "../public/images/Franco Serblin/ktema/ktema_logo_white.png";
import lignea from "../public/images/Franco Serblin/lignea/lignea.png";
import lignea_logo from "../public/images/Franco Serblin/lignea/lignea_logo_white.png";
import Logo from "../public/images/Franco Serblin/logo.png";
import Link from "next/link";

/* import { BASE_URL } from "../api/api"; */

export default function Index({ users }) {
  console.log(users);

  return (
    <>
      <Layout>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>

      <Container fluid className="justify-content-center bg-dark p-5">
        <Row className="justify-content-center ">
          <Col className="text_container p-5" md={12}>
            <Link href="/product_page">
              <Image_comp
                className="max_width_logo"
                layout="raw"
                src={Logo}
                alt="home photo"
              />
            </Link>
          </Col>
          <Col className="text_container p-5" md={12} xl={4}>
            <Link href="/product_page">
              <Image_comp
                className="model_width"
                layout="responsive"
                src={accordo}
                alt="home photo"
              />
            </Link>
            <Link href="/product_page">
              <Image_comp
                className="centered_text franco_logo model_width"
                layout="raw"
                src={accordo_logo}
                alt="home photo"
              />
            </Link>
          </Col>
          <Col className="text_container p-5" md={12} xl={4}>
            <Image_comp
              className="model_width"
              layout="responsive"
              src={accordo_essence}
              alt="home photo"
            />
            <Image_comp
              className="centered_text franco_logo model_width"
              layout="raw"
              src={accordo_essence_logo}
              alt="home photo"
            />
          </Col>
        </Row>

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row className="justify-content-center ">
          <Col className="text_container p-5" md={12} xl={4}>
            <Image_comp
              className="model_width"
              layout="responsive"
              src={ktema}
              alt="home photo"
            />
            <Image_comp
              className="centered_text franco_logo model_width"
              layout="raw"
              src={ktema_logo}
              alt="home photo"
            />
          </Col>
          <Col className="text_container p-5" md={12} xl={4}>
            <Image_comp
              className="model_width"
              layout="responsive"
              src={lignea}
              alt="home photo"
            />
            <Image_comp
              className="centered_text franco_logo model_width"
              layout="raw"
              src={lignea_logo}
              alt="home photo"
            />
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </>
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
