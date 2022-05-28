import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../hooks/useAxios";
import { BASE_URL } from "../api/login";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function AdminPost(props) {
  const http = useAxios();

  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);

  const [updatingPost, setUpdatingPost] = useState(false);

  const [updateError, setUpdateError] = useState(null);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const url = "/wp/v2/posts/";

  const onSubmitWithId = (id) =>
    async function onSubmit(data) {
      setUpdatingPost(true);
      setUpdateError(null);
      setUpdated(false);

      try {
        const response = http.put(BASE_URL + url + id, data);
        setUpdated(true);
      } catch (error) {
        console.log("error", error);
        setUpdateError(error.toString());
      } finally {
        setUpdatingPost(false);
      }
    };

  return (
    <>
      {props.posts.map((post) => {
        return (
          <div key={post.id}>
            <form onSubmit={handleSubmit(onSubmitWithId(post.id))}>
              {updated && <div className="success">The post was updated</div>}
              <Controller
                name="title"
                control={control}
                defaultValue={post.title.rendered}
                render={({ field }) => <input {...field} />}
              />
              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps({ params }) {
  let responseData = null;

  try {
    const response = await axios.get(BASE_URL + "/wp/v2/posts");

    responseData = response.data;
  } catch (error) {
    console.log(error);
  }
  console.log(responseData);

  return {
    props: {
      posts: responseData,
    },
  };
}
