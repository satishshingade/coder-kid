import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./Admin";
import reportWebVitals from "./reportWebVitals";
import User from "./User";
import Problem from "./problem";
import UserQuestion from "./UserQuestion";
import Userhome from "./Userhome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMod
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="user" element={<User />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>

    <Routes>
      <Route path="/userhome" element={<Userhome />} />
    </Routes>


    <Routes>
      <Route path="/userquestion" element={<UserQuestion />} />
    </Routes>

    <Routes>
      <Route path="/problem" element={<Problem />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
