import React from "react";
import "./Dashboard.css"
import NavBar from "../Partials/Navbar";
import SideBar from "../Partials/Sidebar";
import DashContainer from "../Partials/Container";

// import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div class="row dash_main_container">
        <DashContainer />
        <SideBar />
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Dashboard;
