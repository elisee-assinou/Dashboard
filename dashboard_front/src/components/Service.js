import React, { useEffect, useState } from "react";
import "./Service.css";

function Service() {
  const [services, setServices] = useState([]);

  const url = "http://192.168.5.176:3000/services";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div class="row mr-5">
        <div class="h-100 w-100 all_widget_container mr-5">
          {services.map((service) => (
            <div
              class="service_container card col-12 col-sm-4"
              key={service.id}
            >
              <div class="num_div">{service.id}</div>
              <div class="serve_content">
                <div class="serve_title"> {service.title} </div>
                <hr />
                <div class="serve_description">{service.description}</div>
                <hr />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Service;
