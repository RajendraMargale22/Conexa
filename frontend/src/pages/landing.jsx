import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landingPageContainer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)` }}>

      <nav>
        <h2 className="title"><a href="/">Conexa</a></h2>

        <div className="navList">

          <p onClick={ () => navigate("/ajk23")}>Join As Guest</p>

          <div role="button" onClick={() => navigate("/auth")}>
              <p>Register</p>
          </div>

          <div role="button" onClick={() => navigate("/auth")}>
              <p>Login</p>
          </div>

        </div>
      </nav>

      <main className="landingMainContainer">

        <div className="landingContent">
          <h1>
            <span>Connect</span> with your loved Ones
          </h1>

          <p>Cover a distance with Conexa Video Calling...</p>

          <Link to="/auth" className="getStarted">
            Get Started
          </Link>
        </div>

        <div className="landingImage">
          <img src="/mobile.jpg" alt="Conexa Video Calling" />
        </div>

      </main>

    </div>
  );
}