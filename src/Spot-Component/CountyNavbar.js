import React from "react";
import { Link } from "react-router-dom";
import { counties } from "../Counties";

export default function CountyNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul
          className="navbar-nav me-auto mb-2 mb-lg-0"
          style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)" }}>
          {counties.map((county, index) => {
            return (
              <li className="nav-item nav-link" key={index}>
                <Link to={`/scenicSpot/${county}`}>
                  <h5>{county}</h5>
                </Link>
              </li>
            );
          })}
          <li className="nav-item nav-link" key={100}>
            <Link to={`/scenicSpot/`}>
              <h5>Taiwan</h5>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
