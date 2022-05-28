import { useRouter } from "next/router";

export default function BackPage() {
  const router = useRouter();

  return (
    <button
      id="go_back"
      className=" p-2  rounded d-flex align-content-start "
      onClick={() => router.back()}
    >
      Tilbake
    </button>
  );
}
