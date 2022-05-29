import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Heading from "../../components/Heading";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../../components/layout/Footer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Text from "../../components/Text";
import Buttons from "../../components/Button";
import { BASE_URL } from "../../api/api";
import Link from "next/link";
import { getNavigationStaticProps } from "../../js/navigationStaticProps";
import View from "../../components/productView";

export default function UserDetail({ brands, subcategory }) {
  return (
    <>
      <Layout brands={brands}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>
      {subcategory.map((product) => {
        return (
          <Container key={product.id} fluid className=" bg-dark product_page ">
            <Row className="justify-content-center ">
              <Col className="text_container p-5 " md={10} lg={8}>
                <Heading
                  className=""
                  content={product.name}
                  color="white"
                ></Heading>
              </Col>

              <Row className="justify-content-center d-flex alig-items-center">
                <Col className="   " md={7} lg={5}>
                  <View subcategory={subcategory}></View>
                </Col>
              </Row>
            </Row>
            <Row className="justify-content-center ">
              <Col className="text_container p-5 " md={5} lg={4}>
                {" "}
                <Text content={`Pris ${product.prices.price},-`}></Text>
              </Col>
              <Col className="text_container p-5 " md={5} lg={4}>
                {" "}
                <Link href="/contactus">
                  <a>
                    <Buttons
                      className=" btn btn-success btn-lg"
                      content="Kontakt oss"
                      color="white"
                    ></Buttons>
                  </a>
                </Link>
              </Col>
            </Row>

            <Row className="justify-content-center ">
              <Col
                className="text_container border-0 product_spec"
                md={12}
                lg={8}
              >
                <Tabs
                  defaultActiveKey="home"
                  transition={false}
                  id="noanim-tab-example"
                  className="border-0 "
                >
                  <Tab
                    className="bg-danger text-light pb-2 product_tab"
                    eventKey="home"
                    title="PRODUKTBESKRIVELSE"
                  >
                    <Heading
                      className="pt-3 minus_margin_top"
                      content="PRODUKTBESKRIVELSE"
                    ></Heading>

                    <div
                      id="please"
                      className="text-container"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </Tab>
                  <Tab
                    className="bg-danger pb-2 product_tab "
                    eventKey="profile"
                    title="SPESIFIKASJONER"
                  >
                    <Heading
                      className="pt-3 minus_margin_top"
                      content="SPESIFIKASJONER"
                    ></Heading>
                    <div
                      id="please"
                      className="text-container "
                      dangerouslySetInnerHTML={{
                        __html: product.short_description,
                      }}
                    />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        );
      })}
      <Footer></Footer>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(BASE_URL);
    const product = response.data;

    const paths = product.map((product) => ({
      params: { id: String(product.id) },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
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
    (sub) => sub.id === parseInt(params.id)
  );

  return {
    props: {
      ...(await getNavigationStaticProps()),
      subcategory,
    },
  };
}
