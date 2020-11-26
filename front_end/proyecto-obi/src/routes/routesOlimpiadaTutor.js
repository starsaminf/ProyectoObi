/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AtrazIcon from "@material-ui/icons/Backspace";
// core components/views for Admin layout
import Atraz from "../layouts/Tutor.js";
import Convocatoria from "../views/OlimpiadaTutor/Convocatoria.js";
import Etapa from "../views/OlimpiadaTutor/Etapa.js";
import GruposyESt from "../views/OlimpiadaTutor/Grupos y Estudiantes.js";
import enBlanco2 from "../views/OlimpiadaTutor/Paguina"
import DashboardPage from "../views/OlimpiadaTutor/Dashboard"


const dashboardRoutes = [
  {
    path: "",
    name: "volver atras",
    icon: AtrazIcon,
    component: Atraz,
    layout: "/tutor"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/Etapa",
    name: "Etapas",
    icon: Dashboard,
    component: Etapa,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/estudiantes",
    name: "Grupos y Estudiantes",
    icon: Dashboard,
    component: GruposyESt,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/convocatoria",
    name: "Convocatoria",
    icon: Dashboard,
    component: Convocatoria,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/prueba",
    name: "Hoja de Prueba",
    icon: Dashboard,
    component: enBlanco2,
    layout: "/olimpiadaTutor"
  }
];

export default dashboardRoutes;
