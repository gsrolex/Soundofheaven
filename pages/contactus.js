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
import Drammen from "../public/images/contactus/drammen.png";
import Text from "../public/components/Text";
import Buttons from "../public/components/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormContact from "../public/components/Form";

/* import { BASE_URL } from "../api/api"; */

export default function Index({ users }) {
  console.log(users);

  return (
    <>
      <Layout>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>

      <Container fluid className="justify-content-center bg-dark product_page">
        <Row className="justify-content-center ">
          <Col className="text_container p-5 " md={11} lg={11}>
            <Heading className="" content="KONTAKT OSS" color="white"></Heading>
          </Col>
          <Col className="text_container p-5 " md={10} lg={4}>
            <Heading className="" content="VELKOMMEN" color="white"></Heading>
            <br></br>
            <Text content="Sound of heaven ble etablert høsten 2013 og drives av hi-fi og musikk entusiast Jess Wilhelm Koren fra Drammen (Buskerud) Lyd og musikk har vært hans store lidenskap siden 14 års alderen. Sound of heaven har agentur på spennende merker som Franco Serblin, Xavian, Atohm, CAV og Coin høyttalere. Audia Flight og YBA elektronikk. Yter, Harmonic Technology og Telos Audio Design kabler. Dette er produkter som gir meget bra lydkvalitet og har et lekkert design. Produktene er konkurranse dyktige på pris."></Text>
            <br></br>
            <br></br>
            <Text
              className="d-flex align-items-start ps-5"
              content="MVH"
            ></Text>
            <Text
              className="d-flex align-items-start ps-5"
              content="Jess Wilhelm Koren"
            ></Text>
          </Col>
          <Col className="text_container p-5 " md={10} lg={5}>
            <FormContact></FormContact>
          </Col>
          <Row className="justify-content-center ">
            <Col className="text_container p-5 " lg={8}>
              <Heading
                className=""
                content="Vi har showroom i Drammen"
                color="white"
              ></Heading>
              <Text content="Du er hjertelig velkommen etter forespørsel"></Text>
              <Col className="text_container p-5" md={8}></Col>
              <Image_comp
                className="sound_logo"
                priority
                src={Drammen}
                alt="logo"
              ></Image_comp>
            </Col>
          </Row>
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
