import React, { useEffect, useState } from "react";

function AxiosComponent(props) {
  const [services, setServices] = useState([]);
  // const [myServices, setMyServices] = useState([]);

  useEffect(() => {
    // Récupérer les services depuis notre API NestJS en utilisant fetch
    fetch("https://v2.jokeapi.dev/joke/Any/lang=fr")
      // fetch("https://newsapi.org/v2/top-headlines?country=fr&apiKey=e82a468637904cfc979de0c3f67a295c")
      // fetch("https://newsapi.org/v2/top-headlines?country=fr&apiKey=e82a468637904cfc979de0c3f67a295c")
      // fetch("https://newsapi.org/v2/top-headlines?country=fr&apiKey=e82a468637904cfc979de0c3f67a295c")
      // fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")
      // fetch("https://newsapi.org/v2/top-headlines?country=fr&apiKey=e82a468637904cfc979de0c3f67a295c")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La requête a échoué");
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
        console.log(data);
        // console.log(data[0].url);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
  }, []);

  // Fonction pour ajouter un service à nos services personnels en utilisant la route NestJS
  const addToMyServices = (service) => {
    fetch("/add-to-my-services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("La requête a échoué");
      }
      return response.json();
    });
    // .then((data) => {
    //   // Mettez à jour notre liste de services personnels si nécessaire
    //   setMyServices([...myServices, data]);
    // })
    // .catch((error) => {
    //   console.error(
    //     "Erreur lors de l'ajout du service à vos services personnels :",
    //     error
    //   );
    // });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-5">
          Services Disponibles
        </h1>
        {Object.values(services).map((service) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            key={service.id}
          >
            <div key={service.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <button
                onClick={() => addToMyServices(service)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ajouter à mes services
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AxiosComponent;
