import Head from "next/head";
import Layout from "../../components/layout/Layout";
import Heading from "../../components/Heading";
import axios from "axios";
import Image_comp from "../../components/img/Image_comp";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { BASE_URL_CAT } from "../../api/api";
import { getNavigationStaticProps } from "../../js/navigationStaticProps";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export default function Index(props) {
  return (
    <div className="bg-dark">
      <Layout brands={props.brands}>
        <Head title="Results" />
        <Heading className="" content="Home" color="black" />
      </Layout>
      <div className="container min-vh-100 ">
        <div className="container SpeakerBrand_container ">
          <Row className="justify-content-center ">
            <Col className="text_container pb-5">
              <Heading className="" content="lol"></Heading>
            </Col>
          </Row>
          {props.subcategory.map((sub) => {
            return (
              <>
                <Link href={`/model/${String(sub.id)}`}>
                  <div className="col-12 text_container brands_image_container  p-5">
                    {sub.image && sub.image.src && (
                      <Image_comp
                        className="SpeakerBrandImg "
                        layout="fill"
                        sizes="50vw"
                        src={sub.image.src}
                        p-5
                        placeholder="blurDataURL"
                        alt="home photo"
                      />
                    )}
                    <Heading
                      className="centered_text font_x"
                      content={sub.name}
                    ></Heading>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
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

  return { paths: paths || [], fallback: false };
}

export async function getStaticProps({ params }) {
  let responseData = null;

  try {
    const response = await axios.get(BASE_URL_CAT);

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }

  const subcategory = responseData.filter(
    (sub) => sub.parent === parseInt(params.id)
  );

  return {
    props: {
      ...(await getNavigationStaticProps()),
      subcategory,
    },
  };
}
