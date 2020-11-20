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
import DashboardPage from "../views/OlimpiadaTutor/Convocatoria.js";
import enBlanco from "../views/Tutor/enBlanco.js"
import Etapa from "../views/OlimpiadaTutor/Etapa.js";
import MisEstudiantes from "../views/OlimpiadaTutor/MisEstudiantes.js";
import enBlanco2 from "../views/Tutor/enBlanco2.js"


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
    name: "Etapas",
    icon: Dashboard,
    component: Etapa,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/estudiantes",
    name: "Mis Estudiantes",
    icon: Dashboard,
    component: MisEstudiantes,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/convocatoria",
    name: "Convocatoria",
    icon: Dashboard,
    component: DashboardPage,
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
