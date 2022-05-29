import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Heading from "../../components/Heading";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../../components/layout/Footer";
import Image_comp from "../../components/img/Image_comp";

import Link from "next/link";
import { BASE_URL } from "../../api/api";
import { BASE_URL_CAT } from "../../api/api";
import { getNavigationStaticProps } from "../../js/navigationStaticProps";

export default function Index(props) {
  return (
    <>
      <Layout brands={props.brands}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>

      <Container fluid className="justify-content-center bg-dark pt-5 pb-5">
        <Row className="justify-content-center ">
          <Col className="text_container p-5" md={12}>
            <Heading className="p-2"></Heading>
          </Col>
        </Row>

        <Row className="justify-content-center m-5  ">
          {props.subcategory.map((product) => {
            return (
              <Col
                key={product.id}
                className="p-5 container_model hover_effect_h1
                "
                md={12}
                xxl={5}
              >
                <Heading
                  className=" font_model product_heading text-light sparkle "
                  content={product.name}
                ></Heading>
                <Link href={`/produkter/${String(product.id)}`}>
                  <a>
                    {product.images.length > 0 && product.images[0].src ? (
                      <Image_comp
                        className="child_model "
                        layout="fill"
                        sizes="50vw"
                        src={product.images[0].src}
                        placeholder="blurDataURL"
                        alt="home photo"
                      />
                    ) : (
                      <span>{product.name}</span>
                    )}
                  </a>
                </Link>
              </Col>
            );
          })}
        </Row>
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

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }

  const subcategory = responseData.filter(
    (sub) =>
      sub.categories.length > 0 && sub.categories[0].id === parseInt(params.id)
  );

  return {
    props: {
      ...(await getNavigationStaticProps()),
      subcategory,
    },
  };
}
