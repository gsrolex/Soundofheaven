import Head from "next/head";
import Layout from "../public/components/layout/Layout";
import Heading from "../public/components/Heading";
import axios from "axios";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Footer from "../public/components/layout/Footer";
import Image_comp from "../public/components/img/Image_comp";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import accordo from "../public/images/Franco Serblin/accordo/accordo.png";
import Text from "../public/components/Text";
import Buttons from "../public/components/Button";
import styles from "../styles/Nav.module.scss";

/* import { BASE_URL } from "../api/api"; */

export default function Index({ users }) {
  console.log(users);

  return (
    <>
      <Layout id={styles.nav_dark}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>

      <Container fluid className="justify-content-center bg-dark product_page">
        <Row className="justify-content-center ">
          <Col
            className="text_container p-5  d-flex align-items-start"
            md={10}
            lg={8}
          >
            <Heading className="" content="Accordo" color="white"></Heading>
          </Col>
          <Row className="justify-content-center ">
            <Col
              className="text_container p-5 d-flex align-items-start"
              md={12}
              lg={8}
            >
              <Image_comp
                className="sound_logo"
                priority
                src={accordo}
                alt="logo"
              ></Image_comp>
            </Col>
          </Row>
        </Row>
        <Row className="justify-content-center ">
          <Col className="text_container p-5 " md={5} lg={4}>
            {" "}
            <Text content="Pris: 84 999.-"></Text>
          </Col>
          <Col className="text_container p-5 " md={5} lg={4}>
            {" "}
            <Buttons
              className=" btn btn-success btn-lg"
              content="Kontakt oss"
              color="white"
            ></Buttons>
          </Col>
        </Row>

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row className="justify-content-center ">
          <Col className="text_container p-5 " md={12} lg={8}>
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="mb-3 "
            >
              <Tab eventKey="home" title="PRODUKTBESKRIVELSE">
                <Heading content="PRODUKTBESKRIVELSE"></Heading>
                <Text
                  content="Mauris quis nulla malesuada libero semper faucibus. Proin blandit tempor sodales. Integer mauris eros, congue ut est in, lacinia interdum orci. Nam lacinia neque 
                quis pellentesque tincidunt. Nulla eu lectus id diam scelerisque cursus. Quisque id enim risus. 
                Sed blandit euismod nisi, vel facilisis ante efficitur at. Donec quis pretium magna. 
                Vestibulum tempus lobortis blandit. Aliquam at semper lorem. Suspendisse potenti. Etiam at erat quis leo euismod porta eget id dui. 
                Proin aliquet, sapien non pellentesque finibus, diam nisi hendrerit nibh, accumsan fermentum massa nibh a"
                ></Text>
              </Tab>
              <Tab eventKey="profile" title="SPESIFIKASJONER">
                <Heading content="SPESIFIKASJONER"></Heading>
                <Text
                  content="Mauris quis nulla malesuada libero semper faucibus. Proin blandit tempor sodales. Integer mauris eros, congue ut est in, lacinia interdum orci. Nam lacinia neque 
                quis pellentesque tincidunt. Nulla eu lectus id diam scelerisque cursus. Quisque id enim risus. 
                Sed blandit euismod nisi, vel facilisis ante efficitur at. Donec quis pretium magna. 
                Vestibulum tempus lobortis blandit. Aliquam at semper lorem. Suspendisse potenti. Etiam at erat quis leo euismod porta eget id dui. 
                Proin aliquet, sapien non pellentesque finibus, diam nisi hendrerit nibh, accumsan fermentum massa nibh a"
                ></Text>
              </Tab>
            </Tabs>
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
