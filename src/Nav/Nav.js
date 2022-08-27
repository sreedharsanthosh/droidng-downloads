import React from "react";
import "../css/main.css";
import logo from "../assets/LOGO.png";

function Nav() {
  return (
    <div>
      <a
        href="https://droid-ng.eu.org/"
        target="blank"
        style={{
          textDecoration: "none",
        }}
      >
        {" "}
        <div className="nav">
          <img src={logo} alt="Logo" />
          <h1>Back to Website</h1>
        </div>
      </a>
    </div>
  );
}

export default Nav;
