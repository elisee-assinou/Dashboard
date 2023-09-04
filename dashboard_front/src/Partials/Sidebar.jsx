import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const SideBar = () => {
  return (
    <div class="main_side_bar m-0 col-3 border-left">
      <a
        href="/"
        class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
      >
        <span class="fs-5 fw-semibold">Dashboard</span>
      </a>
      <ul class="list-unstyled ps-0 ">
        <Link to="dashboard/users" class="active">
          <li class="mb-1">
            <i class="fa fa-users mr-2" aria-hidden="true"></i>
            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0">
              User
            </button>
          </li>
        </Link>
        <Link to="dashboard/services">
          <li class="mb-1">
            <i class="fa fa-filter mr-2" aria-hidden="true"></i>
            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0">
              Services
            </button>
          </li>
        </Link>

        <Link to="dashboard/preferences">
          <li class="mb-1">
            <i class="fa fa-heart mr-2" aria-hidden="true"></i>
            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0">
              Preferencies
            </button>
          </li>
        </Link>

        <li class="border-top my-3"></li>
        <li class="mb-1 active">
          <i class="fa fa-cog" aria-hidden="true"></i>
          <button class="btn btn-toggle d-inline-flex align-items-center rounded ">
            Account
          </button>
        </li>
      </ul>
      <script></script>
    </div>
  );
};
export default SideBar;
