import React, { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import NotFound from "./Pages/Notfound";
import Register from "./Pages/Register";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/dashboard/users" element={<Login />} />
          <Route path="/dashboard/add-users" element={<AddUser />} />
          <Route path="/dashboard/services" element={<Login />} />
          <Route path="/dashboard/preferences" element={<Login />} />
          <Route path="/dashboard/edit_user" element={<Login />} />
          <Route path="/dashboard/user/:id" element={<EditUser />} />
          <Route path="/dashboard/edit_user/:id" element={<Login />} />
          <Route path="/dashboard/delete_user/:id" element={<Login />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
