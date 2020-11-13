import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.js";
import Tutor from "./layouts/Tutor.js";
import Index from "./layouts/Public.js";
import Iniciar from "./layouts/Login/Iniciar.js";
import IniciarAdmin from "./layouts/Login/IniciarAdmin.js";
import Crear from "./layouts/Login/Crear.js";
import OlimpiadaAdmin from "./layouts/OlimpiadaAdmin.js";
import OlimpiadaTutor from "./layouts/OlimpiadaTutor.js";
const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/iniAdmin" component={IniciarAdmin} />
      <Route path="/admin" component={Admin} />
      <Route path="/tutor" component={Tutor} />
      <Route path="/olimpiadaAdmin" component ={OlimpiadaAdmin}/>
      <Route path="/olimpiadaTutor" component ={OlimpiadaTutor}/>
      <Route path="/" component={Index} />
    </Switch>
  </Router>,
  document.getElementById("root")
)