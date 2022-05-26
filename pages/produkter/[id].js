import Img_comp from "../../components/img/Image_comp";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Heading from "../../components/Heading";
import axios from "axios";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Footer from "../../components/layout/Footer";
import Image_comp from "../../components/img/Image_comp";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Text from "../../components/Text";
import Buttons from "../../components/Button";
import styles from "../../styles/Nav.module.scss";
import { BASE_URL } from "../../api/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { getNavigationStaticProps } from "../../js/navigationStaticProps";
import View from "../../components/productView";
/* import { BASE_URL } from "../api/api"; */

export default function UserDetail({ product, brands, subcategory }) {
  const router = useRouter();
  return (
    <>
      <Layout brands={brands} id={styles.nav_dark}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>
      {subcategory.map((product) => {
        return (
          <Container fluid className=" bg-dark product_page ">
            <Row className="justify-content-center ">
              <Col
                className="text_container   d-flex align-items-start"
                md={10}
                lg={8}
              >
                <button
                  className="not_phone"
                  type="button"
                  onClick={() => router.back()}
                >
                  Click here to go back
                </button>
              </Col>
              <Col
                className="text_container p-5  d-flex align-items-start"
                md={10}
                lg={8}
              >
                <Heading
                  className=""
                  content={product.name}
                  color="white"
                ></Heading>
              </Col>

              <Row className="justify-content-center d-flex alig-items-center">
                <Col className="   " md={7} lg={5}>
                  {/*       <Image_comp
                    className="child_model product_picture "
                    priority
                    layout="fill"
                    src={product.images[0].src}
                    alt="logo"
                  ></Image_comp> */}
                  <View subcategory={subcategory}></View>
                </Col>
                <Col className="" md={3} lg={3}></Col>
              </Row>
            </Row>
            <Row className="justify-content-center ">
              <Col className="text_container p-5 " md={5} lg={4}>
                {" "}
                <Text content={product.prices.price}></Text>
              </Col>
              <Col className="text_container p-5 " md={5} lg={4}>
                {" "}
                <Link href="/contactus">
                  <Buttons
                    className=" btn btn-success btn-lg"
                    content="Kontakt oss"
                    color="white"
                  ></Buttons>
                </Link>
              </Col>
            </Row>

            {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
            <Row className="justify-content-center ">
              <Col className="text_container  " md={12} lg={8}>
                <Tabs
                  defaultActiveKey="home"
                  transition={false}
                  id="noanim-tab-example"
                  className=" "
                >
                  <Tab
                    className="bg-danger text-light pb-2 product_tab"
                    eventKey="home"
                    title="PRODUKTBESKRIVELSE"
                  >
                    <Heading
                      className="pt-2 "
                      content="PRODUKTBESKRIVELSE"
                    ></Heading>

                    <div
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
                      className="pt-2 "
                      content="SPESIFIKASJONER"
                    ></Heading>
                    <div
                      className="text-container"
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

    console.log(response.data);

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

    console.log("response", response.data);

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
      product: responseData,
    },
  };
}
