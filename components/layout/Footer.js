import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container-fluid footer_style text-light d-flex flex-wrap justify-content-center align-items-center">
      <div className="">
        <div className="col-md-12 d-flex align-items-center">
          <span className="text-muted">&copy; 2022 Sound of Heaven</span>
        </div>
        <div className="col-md-12 d-flex justify-content-center p-3">
          <Link href="/login">
            <a className="">
              <span className="text-light">Log inn</span>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
