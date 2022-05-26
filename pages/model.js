import Head from "next/head";
import Layout from "../components/layout/Layout";
import Heading from "../components/Heading";
import axios from "axios";
/* import Model_comp from "../public/components/Model_comp.Js"; */
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Footer from "../components/layout/Footer";
import Image_comp from "../components/img/Image_comp";
import Logo from "../public/images/Franco Serblin/logo.png";
import Link from "next/link";
import { BASE_URL } from "../api/api";

export default function Index({ products, mapCat }) {
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
        </Row>

        <Row className="justify-content-center m-5 ">
          {" "}
          {products.map((product) => {
            console.log(mapCat);
            return (
              <Col
                key={product.id}
                className="p-5 container_model"
                md={12}
                xl={5}
              >
                <Link href={`/produkter/${String(product.id)}`}>
                  <a>
                    <Image_comp
                      className="child_model"
                      layout="responsive"
                      width={500}
                      height={500}
                      src={product.images[0].src}
                      alt="home photo"
                    />
                  </a>
                </Link>
              </Col>
            );
          })}
        </Row>

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      </Container>

      <Footer></Footer>
    </>
  );
}

export async function getStaticProps() {
  let responseData = [];

  try {
    const response = await axios.get(BASE_URL);

    console.log("response", response.data);

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }
  const mapCat = responseData
    .flatMap((entry) => entry.categories)
    .map((category) => category.name)
    .filter((spes) => spes.name === "Franco Serblin");
  console.log(mapCat);

  console.log("products", responseData);

  return {
    props: {
      products: responseData,
      mapCat,
    },
  };
}
