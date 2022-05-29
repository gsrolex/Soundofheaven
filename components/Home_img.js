import React from "react";
import PropTypes from "prop-types";
import home from "../../images/backgoundPhotos/homeScreen.png";
import Image_comp from "../components/img/Image_comp";

function Home_img(props) {
  return (
    <section className="">
      <Image_comp
        className="-z-50"
        layout="fill"
        objectFit="cover"
        src={home}
        alt="home photo"
      />
    </section>
  );
}

Home_img.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Home_img;
