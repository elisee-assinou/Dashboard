import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditUser(props) {
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    password: "",
    new_password: "",
    new_password_conf: "",
  });
  const [updatedResponse, setUpdatedResponse] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const location = useLocation();

  useEffect(() => {
    getCurrentUserId();
  }, [location.pathname]);

  useEffect(() => {
    if (!showPasswordFields) {
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        password: "",
        new_password: "",
        new_password_conf: "",
      }));
    }
  }, [showPasswordFields]);

  async function getCurrentUserId() {
    const currentPath = window.location.href;
    const splitedPath = currentPath.split("/");
    const the_path_id = splitedPath[splitedPath.length - 1];

    setCurrentUserId(the_path_id);

    try {
      const url = `http://192.168.5.176:3000/user/${the_path_id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("La récupération des données a échoué");
      }
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  }


  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    

    try {
      console.log(currentUserId)
      const url = `http://192.168.5.176:3000/user/${currentUserId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error("La mise à jour de l'utilisateur a échoué");
      }
      const data = await response.json();
      setUpdatedResponse(data);
      navigate("/dashboard/users");
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="p-10 profile_container">
        <div className="container bootstrap snippets bootdeys">
          <div className="row">
            <div className="col-xs-12 col-sm-9">
              <form onSubmit={handleSubmit} className="form-horizontal">
                {errors.length > 0 && (
                  <div id="error_screen" className="alert alert-danger">
                    {errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <div className="">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        className="img-circle profile-avatar"
                        alt="User avatar"
                        style={{ maxWidth: "150px", margin: "0 auto 20px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="panel panel-default mt-5">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="col-sm-6 control-label">Username</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder={currentUser.username}
                          value={updatedUser.username}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="panel-body mt-5">
                      <div className="form-group mt-5">
                        <label className="col-sm-2 control-label" name="email">
                          E-mail
                        </label>
                        <div className="col-sm-10">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder={currentUser.email}
                            value={updatedUser.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showPasswordFields ? (
                  <div className="panel panel-default mt-5">
                    <div className="panel-body mt-2">
                      <div className="form-group">
                        <label className="control-label">Current password</label>
                        <div className="col-sm-10">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={updatedUser.password}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <label className="control-label">New password</label>
                        <div className="col-sm-10">
                          <input
                            type="password"
                            className="form-control"
                            name="new_password"
                            value={updatedUser.new_password}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <label className="control-label">Password confirmation</label>
                        <div className="col-sm-10">
                          <input
                            type="password"
                            className="form-control"
                            name="new_password_conf"
                            value={updatedUser.new_password_conf}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="panel panel-default mt-5">
                    <div className="panel-body mt-2">
                      <div className="form-group">
                        <label className="control-label">Password confirmation required</label>
                        <div className="col-sm-10">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setShowPasswordFields(true)}
                          >
                            Show Password Fields
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group mt-2">
                  <div className="col-sm-10 col-sm-offset-2">
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
