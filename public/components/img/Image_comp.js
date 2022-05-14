import Image from "next/image";
import "../../../styles/images.module.css";

export default function img(props) {
  return (
    <Image
      className={props.className}
      alt={props.alt}
      {...props}
      src={props.src}
    />
  );
}
