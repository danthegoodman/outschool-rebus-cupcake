import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { getUserData } from "./util/auth";
import { Container } from "reactstrap";

if (!getUserData()) {
  window.location.assign("/auth/login");
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Container fluid className="bg-teal mh-100">
        <Router>
          <App />
        </Router>
      </Container>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
