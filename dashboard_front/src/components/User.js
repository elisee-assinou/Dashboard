import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./User.css";
import { Link, useNavigate } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState([]);


  const navigate = useNavigate();

  async function deleteUser(params) {

    const url = `http://192.168.5.176:3000/user/${params}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setDeleteResponse(data);
        window.location.reload()
      })
      .catch((error) => console.log(error));
    
  }

  const url = "http://192.168.5.176:3000/user";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Récupérer les services depuis notre API NestJS en utilisant fetch
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("La requête a échoué");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers({ users: data });
  //       console.log(data);
  //       console.log(users);
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la récupération des services :", error);
  //     });
  // }, []);

  // // Fonction pour ajouter un service à nos services personnels en utilisant la route NestJS
  // const addUserToDB = (service) => {
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(service),
  //   }).then((response) => {
  //     if (!response.ok) {
  //       throw new Error("La requête a échoué");
  //     }
  //     return response.json();
  //   });
  //   // .then((data) => {
  //   //   // Mettez à jour notre liste de services personnels si nécessaire
  //   //   setMyServices([...myServices, data]);
  //   // })
  //   // .catch((error) => {
  //   //   console.error(
  //   //     "Erreur lors de l'ajout du service à vos services personnels :",
  //   //     error
  //   //   );
  //   // });
  // };

  return (
    <>
      <Link to="/dashboard/add-users" className="btn btn-primary">
        Ajouter un utilisateur
      </Link>
      {users.map((user) => (
        <div class="card user_wrapper row " key={user.id}>
          <div class="user_img col-2 col-sm-2 "></div>
          <div class="user_info col-3 col-sm-4">
            <div class="user_name first_line">{user.username}</div>
            <div class="user_email second_line">{user.email}</div>
          </div>
          <div class="user_info col-12 col-sm-3 preferences">
            <div class="first_line">Preferences</div>
            <div class="second_line">{user.preferences.length}</div>
          </div>
          <div class="user_btn col-12 col-sm-2">
            <div class="first_line">Actions</div>
            <div class="btn_action ">
              <Link to={`/dashboard/edit_user/${user._id}`}>
                <i class="fa-solid fa-user-pen "></i>
              </Link>

              <Link>
                <i
                  class="fa-solid fa-trash "
                  onClick={() => deleteUser(user._id)}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default User;
