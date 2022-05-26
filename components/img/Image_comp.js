import Image from "next/image";

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
