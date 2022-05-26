import React from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import logo from "../../public/images/icons/logo.png";
import Image_comp from "../img/Image_comp";
import useWindowDimensions from "../../js/nav";
import { BASE_URL_CAT } from "../../api/api";

export default function nav({ id, hideNavBarBg, brands }) {
  const { width } = useWindowDimensions();
  console.log("here", brands);
  const navBarBg =
    !hideNavBarBg || (width > 0 && width <= 960) ? " bg-dark" : "";
  return (
    <Nav
      className={
        "navbar navbar-expand-lg fixed-top navbar-dark nav_margin this" +
        navBarBg
      }
    >
      <div className="container-fluid" id={id}>
        <a className="navbar-brand" href="/">
          <Image_comp
            className="sound_logo"
            height={35}
            width={120}
            priority
            src={logo}
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav   mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active  " aria-current="page" href="#">
                  Hjem
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Produkter
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {brands.map((brand) => {
                  return (
                    <Link href={`/brands/${String(brand.id)}`}>
                      <li key={brand.id}>{brand.name}</li>
                    </Link>
                  );
                })}
                {/*           <li>
                  <Link href="/speakerBrand">
                    <a className="dropdown-item" href="#">
                      Forsterker
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/speakerBrand">
                    <a className="dropdown-item" href="#">
                      Kabler
                    </a>
                  </Link>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/contactus">
                <a className="nav-link active  " aria-current="page" href="#">
                  Kontakt
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"></a>
            </li>
          </ul>
          <form className="d-flex">
            {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> */}
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </Nav>
  );
}
