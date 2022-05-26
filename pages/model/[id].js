import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Heading from "../../components/Heading";
import axios from "axios";
/* import Model_comp from "../public/components/Model_comp.Js"; */
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Footer from "../../components/layout/Footer";
import Image_comp from "../../components/img/Image_comp";
import Logo from "../../public/images/Franco Serblin/logo.png";
import Link from "next/link";
import { BASE_URL } from "../../api/api";
import { BASE_URL_CAT } from "../../api/api";
import { getNavigationStaticProps } from "../../js/navigationStaticProps";

export default function Index({ subcategory, products, brands }) {
  console.log("here idiot", subcategory);
  return (
    <>
      <Layout brands={brands}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>

      <Container fluid className="justify-content-center bg-dark pt-5 pb-5">
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

        <Row className="justify-content-center m-5  ">
          {" "}
          {subcategory.map((product) => {
            return (
              <Col
                key={product.id}
                className="p-5 container_model 
                "
                md={12}
                xxl={5}
              >
                <Heading
                  className=" font_model product_heading text-light"
                  content={product.name}
                ></Heading>
                <Link href={`/produkter/${String(product.id)}`}>
                  <a>
                    <Image_comp
                      className="child_model "
                      layout="fill"
                      sizes="50vw"
                      src={product.images[0].src}
                      placeholder="blurDataURL"
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

export async function getStaticPaths() {
  let responseData = null;

  try {
    const response = await axios.get(BASE_URL_CAT);

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }

  const paths = responseData.map((category) => ({
    params: { id: String(category.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let responseData = [];

  try {
    const response = await axios.get(BASE_URL);

    console.log("response", response.data);

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }

  const subcategory = responseData.filter(
    (sub) => sub.categories[0].id === parseInt(params.id)
  );

  console.log("products", responseData);

  return {
    props: {
      ...(await getNavigationStaticProps()),
      subcategory,
      products: responseData,
    },
  };
}
