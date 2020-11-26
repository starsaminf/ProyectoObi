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
import Atraz from "../views/Admin/Dashboard.js";
import DashboardPage from "../views/Admin/Olimpiada.js";
import Salir from "../views/Admin/Salir.js";
import Olimpiada from "../views/OlimpiadaAdmin/Olimpiada.js";
import Niveles from "../views/OlimpiadaAdmin/Nivel.js";
import Etapa from "../views/OlimpiadaAdmin/Etapa.js";
import Grupos from "../views/OlimpiadaAdmin/Grupos y Estudiantes.js";
import Convocatoria from "../views/OlimpiadaTutor/Convocatoria.js";
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/olimpiada",
    name: "volver atras",
    icon: AtrazIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "OLimpiada",
    icon: Dashboard,
    component: Olimpiada,
    layout: "/olimpiadaAdmin"
  },
   
  {
    path: "/niveles",
    name: "Niveles",
    icon: Dashboard,
    component: Niveles,
    layout: "/olimpiadaAdmin"
  }, 
  {
    path: "/1",
    name: "Etapas",
    icon: Dashboard,
    component: Etapa,
    layout: "/olimpiadaAdmin"
  }, 
  {
    path: "/grupos",
    name: "Grupos y estudiantes",
    icon: Dashboard,
    component: Grupos,
    layout: "/olimpiadaAdmin"
  },
  {
    path: "/convocatoria",
    name: "Convocatoria",
    icon: Dashboard,
    component: Convocatoria,
    layout: "/olimpiadaAdmin"
  }
  
];

export default dashboardRoutes;
