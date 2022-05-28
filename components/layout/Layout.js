import React, { useEffect, useCallback, useRef, useState } from "react";
import Link from "next/link";
import logo from "../../public/images/icons/logo.png";
import Image_comp from "../img/Image_comp";
import useWindowDimensions from "../../js/nav";
import { SEARCH_URL } from "../../api/api";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

export default function Layout({ id, hideNavBarBg, brands }) {
  const { width } = useWindowDimensions();

  console.log("here", brands);

  const navBarBg =
    !hideNavBarBg || (width > 0 && width <= 960) ? " bg-dark" : "";

  const searchRef = useRef(null);
  const resultRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = useCallback((event) => {
    if (resultRef.current) resultRef.current.style.display = "block";
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      axios.get(SEARCH_URL + query).then((res) => {
        console.log(res.data);
        setResults(res.data);
      });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = () => {
    setActive(true);
    window.addEventListener("click", onClick);
  };

  const onClick = useCallback((event) => {
    if (resultRef && resultRef.current && resultRef.current.style) {
      resultRef.current.style.display = "block";
    }
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      if (resultRef && resultRef.current && resultRef.current.style) {
        resultRef.current.style.display = "none";
      }
      setActive(false);
      setQuery("");
      setResults([]);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <nav
      className={
        "navbar navbar-expand-lg fixed-top navbar-dark nav_margin this" +
        navBarBg
      }
    >
      <div className="container-fluid" id={id}>
        <Link href="/">
          <a className="navbar-brand">
            <Image_comp
              className="sound_logo"
              height={35}
              width={120}
              priority
              src={logo}
              alt="logo"
            />
          </a>
        </Link>
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
              <ul
                id="nav_dropdown_texts"
                className="dropdown-menu bg-danger"
                aria-labelledby="navbarDropdown"
              >
                {brands &&
                  brands.map((brand) => {
                    return (
                      <Link key={brand.id} href={`/brands/${String(brand.id)}`}>
                        <a
                          id="nav_dropdown_texts"
                          className="dropdown-item text-center "
                        >
                          <li className="nav_dropdown_text " key={brand.id}>
                            {brand.name}
                          </li>
                        </a>
                      </Link>
                    );
                  })}
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

          <Row>
            <Col md={10} lg={11} className="">
              <div className="d-flex justify-content-center " ref={searchRef}>
                <input
                  id="textbox_id"
                  className="form-control me-2 rounded-0 rounded-top "
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  autoComplete="off"
                  onChange={onChange}
                  onFocus={onFocus}
                  value={query}
                ></input>
                <button className="btn btn-primary " type="submit">
                  Search
                </button>
              </div>
            </Col>
            <Col md={9} lg={9} className="position-absolute mt-4 search_top">
              <div
                className="search_box "
                ref={resultRef}
                style={{
                  display: "none",
                }}
              >
                {active && results && results.length > 0 && (
                  <ul
                    id="search_box "
                    className="list-none overflow-hidden mt-3 p-2 top-full inset-x-0 min-h-100px bg-light
           dark:bg-background-dark-mode Search_Container rounded-bottom"
                  >
                    {results.map(({ name, id }) => (
                      <li
                        id="remove_decoration"
                        className=" text-start text-normal-text mt-2 leading-4 dark:bg-background-dark-mode last:mb-4 Search_Container "
                        key={id}
                      >
                        <Link
                          href={`/produkter/${id}`}
                          className=" Search_Container "
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </nav>
  );
}
