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

// core components/views for Admin layout
import DashboardPage from "../views/Admin/Dashboard.js";
import Material from "../views/Admin/MaterialDeApoyo.js";
import Noticias from "../views/Admin/Noticias.js";
import Distritos from "../views/Admin/Distritos.js";
import Colegios from "../views/Admin/Colegios.js";
import Olimpiadas from "../views/Admin/Olimpiada.js";
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/olimpiada",
    name: "Olimpiadas",
    icon: Dashboard,
    component: Olimpiadas,
    layout: "/admin"
  },
  {
    path: "/noticias",
    name: "Noticias",
    icon: Dashboard,
    component: Noticias,
    layout: "/admin"
  },
  {
    path: "/colegios",
    name: "Colegios",
    icon: Dashboard,
    component: Colegios,
    layout: "/admin"
  },
  {
    path: "/distritos",
    name: "Distritos",
    icon: Dashboard,
    component: Distritos,
    layout: "/admin"
  },
  {
    path: "/material",
    name: "Material De Apoyo",
    icon: Dashboard,
    component: Material,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
