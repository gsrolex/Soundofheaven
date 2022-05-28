import Head from "next/head";
import Layout from "../components/layout/Layout";
import Heading from "../components/Heading";
import axios from "axios";
import Footer from "../components/layout/Footer";
import { BASE_URL_EMAIL } from "../api/apiEmail";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import BackPage from "../components/GoBackOnePage";

export default function fakeAdmin({ subcategory, brands, history }) {
  return (
    <div className="bg-dark">
      <Layout brands={brands}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>
      <div className="container min-vh-100 ">
        <div className="container SpeakerBrand_container ">
          <Row className="justify-content-center ">
            <Col id="go_back" className="text_container pb-5 ">
              <Heading className="" content="Email Logg"></Heading>
              <BackPage></BackPage>
            </Col>

            <div>
              {history.map((email) => {
                if (email.template_params) {
                  const str = JSON.parse(email.template_params);
                  const firstName = str.firstName || null;
                  const lastName = str.lastName || null;
                  const message = str.message || null;
                  const phoneNumber = str.phoneNumber || null;
                  /*  const email = str.email || null; */ /////////// SAM PLEASE /////////////// kan ikke finne email

                  if (!firstName || !lastName || !message) {
                    return null;
                  }

                  return (
                    <div className="card m-5">
                      <div className="card-body">
                        <p className="small">{email.created_at}</p>
                        <h3 className="card-title">
                          Fra:&nbsp;{firstName}&nbsp;
                          {lastName}
                        </h3>
                        <hr />
                        <p className="card-text email_bold">
                          Tlf:&nbsp;{phoneNumber}
                        </p>
                        <hr />
                        <p className="card-text">{message}</p>
                      </div>
                      <hr />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </Row>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let responseData = null;

  try {
    const response = await axios.get(BASE_URL_EMAIL);

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }

  const history = responseData.rows.map((company) => company);

  return {
    props: {
      history,
    },
  };
}
