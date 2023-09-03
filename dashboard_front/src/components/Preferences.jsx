import React from "react";
import "./Preferences.css";

function Preferences() {
  return (
    <div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service</th>
            <th scope="col">Url</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>http://localhost:3000/dashboard/preferences</td>
            <td>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Preferences;
