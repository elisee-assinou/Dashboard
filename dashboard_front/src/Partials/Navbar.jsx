import React from "react";
// import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary px-5 w-100 bg-secondary-subtle">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Dashboard
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
          <form class="d-flex form-group" role="search">
            <div class="input-group input-group-sm h-50  mx-5">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline" type="submit">
                Search
              </button>
            </div>

            <li class="nav-item dropdown ">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <i class="fa-solid fa-circle-user h-50"></i>
              </a>
              <ul class="dropdown-menu w-auto">
                <li>
                  <a class="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </form>
        </div>
      </div>
      <style></style>
    </nav>
  );
};
export default NavBar;
