// import React from "react";
// import "../css/Header.css";

// const Header = () => {
//   return (
//     <div className="header">
//       <h1 className="title">ChatBot</h1>
//     </div>
//   );
// };

// export default Header;

/**
 * Header Component
 *
 * This component renders the top navigation bar of the application. It includes:
 * - A logo section displaying the Pfizer logo.
 * - A title for the service dashboard.
 * - A navigation group containing buttons and icons for various actions.
 *
 * Functionality:
 * - The "New Project" button navigates to the '/start' route when clicked, allowing users to create a new project.
 * - Includes icons for search, notifications, and account management, which are displayed as buttons.
 * - The component utilizes Material-UI `Button` and icons with custom styling.
 */


import { useState, React, useEffect } from "react";
import "../css/Header.css";
import pfizer_logo from "../assets/Pfizer_Logo_Color_RGB.png"


function Header() {

  return (
    <header className="header">
      <div className="title">
        <div className="ai-box">
          {/* <img src={pfizer_logo} alt="" style={{height:"30px"}}/> */}
          <p className="title-name">Chatbot</p>
        </div>
        {/* <p className="title-name">Chatbot</p> */}
      </div>
      <div className="nav-group">
      </div>
    </header>
  );
}

export default Header;
