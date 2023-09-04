import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import User from "../components/User";
import Service from "../components/Service";
import EditUser from "../components/EditUser";
import AxiosComponent from "../components/AxiosComponent";
import AddUser from "../components/AddUser";

import "./Container.css";
import Preferences from "../components/Preferences";
const DashContainer = () => {
  const location = useLocation();
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    setCurrentComponent(getCurrentComponent());
  }, [location.pathname]);

  function getCurrentComponent() {
    let currentPath = window.location.href;
    // if (currentPath.inde("edit_user")) {
    if (
      currentPath.split("/").some((x) => x === "edit_user") &&
      currentPath.split("/").some((x) => x === "dashboard") &&
      currentPath.split("/").length >= 3
    ) {
      console.log(currentPath.split("/"));
      console.log(currentPath.split("/"));
      return <EditUser />;
    } else {
      switch (location.pathname) {
        case "/dashboard/users":
          return <User />;
        case "/dashboard/add-users":
          return <AddUser />;
        case "/dashboard/services":
          return <Service />;
        case "/dashboard/preferences":
          return <Preferences />;
        // case location.pathname.includes("/dashboard/edit_user/") &&
        //   location.pathname.length > 21:
        //   return <EditUser />;
        case "/":
          return <AxiosComponent />;
        default:
          return null;
      }
    }
  }
  return <div class="col-9 px-5 h-100 main_container">{currentComponent}</div>;
};

export default DashContainer;
