import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../hooks/useAxios";
import { BASE_URL } from "../api/login";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { Head } from "next/document";
import Heading from "../components/Heading";
import { Row, Col } from "react-bootstrap";
import BackPage from "../components/GoBackOnePage";
import Footer from "../components/layout/Footer";

const schema = yup.object().shape({});

export default function AdminPost() {
  const http = useAxios();

  const [posts, setPosts] = useState(null);

  const [updated, setUpdated] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    try {
      axios.get(BASE_URL + "/wp/v2/posts").then((response) => {
        console.log(response.data);
        setPosts(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [updated]);

  const url = "/wp/v2/posts/";

  const onSubmitWithId = (id) =>
    async function onSubmit(data) {
      setUpdated(false);

      const newData = {};
      for (const [key, value] of Object.entries(data)) {
        const i = key.indexOf(":");
        const id = key.substring(0, i);
        const newKey = key.substring(i + 1, key.length);
        if (!(id in newData)) {
          newData[id] = {};
        }
        newData[id][newKey] = value;
      }

      try {
        for (const [key, value] of Object.entries(newData)) {
          http.put(BASE_URL + url + key, value);
        }
        setUpdated(true);
      } catch (error) {
        console.log("error", error);
      }
    };

  return (
    <>
      <div className="bg-dark">
        <Layout>
          <Head title="AdminPost" />
          <Heading className="" content="Home" color="black" />
        </Layout>
        <div className="container min-vh-100 ">
          <div className="container SpeakerBrand_container ">
            <Row className="justify-content-center d-flex flex-column">
              <Col id="go_back" className="text_container pb-5 ">
                <Heading
                  className=""
                  content="Get Title and Slug. Edit and creat"
                ></Heading>
                <BackPage></BackPage>
              </Col>
              <Col id="go_back" className="text_container pb-5 ">
                <div>
                  {posts &&
                    posts.map((post) => {
                      return (
                        <div key={post.id}>
                          <form
                            onSubmit={handleSubmit(onSubmitWithId(post.id))}
                          >
                            {updated && (
                              <div className="success">
                                The post was updated
                              </div>
                            )}
                            <div className="p-1">
                              Title&nbsp;&nbsp;
                              <Controller
                                name={post.id + `:title`}
                                control={control}
                                defaultValue={post.title.rendered}
                                render={({ field }) => <input {...field} />}
                              />
                            </div>
                            <br></br>
                            <div className="p-1">
                              Slug&nbsp;&nbsp;
                              <Controller
                                name={post.id + `:slug`}
                                control={control}
                                defaultValue={post.slug}
                                render={({ field }) => <input {...field} />}
                              />
                            </div>
                            <div>
                              <button type="submit">Update</button>
                            </div>
                          </form>
                        </div>
                      );
                    })}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
