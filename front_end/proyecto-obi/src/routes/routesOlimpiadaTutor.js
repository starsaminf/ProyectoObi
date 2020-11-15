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
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import Atraz from "../layouts/Tutor.js";
import DashboardPage from "../views/OlimpiadaTutor/Dashboard.js";
import enBlanco from "../views/Tutor/enBlanco.js"
import Etapa1 from "../views/OlimpiadaTutor/Etapa1.js";//../views/olimpiadaTutor/Etapa1.js"
// core components/views for RTL layout


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
    name: "Olimpiada",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/estudiantes",
    name: "Estudiantes",
    icon: Dashboard,
    component: Etapa1,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/1",
    name: "1 Etapa - Incripcion",
    icon: Dashboard,
    component: enBlanco,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/2",
    name: "2 Etapa- Distrital",
    icon: Dashboard,
    component: enBlanco,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/3",
    name: "3 Etapa - departamental",
    icon: Dashboard,
    component: enBlanco,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/4",
    name: "4 Etapa - Nacional",
    icon: Dashboard,
    component: enBlanco,
    layout: "/olimpiadaTutor"
  },
  {
    path: "/5",
    name: "5 Etapa - Premiacion",
    icon: Dashboard,
    component: enBlanco,
    layout: "/olimpiadaTutor"
  },
  
];

export default dashboardRoutes;
