import React, { useEffect, useState }  from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
const cookies = new Cookies();
const baseUrl=HOST.Url+'Olimpiada.php';
const useStyles = makeStyles(styles);
function header(){
  return {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};

export default function Dashboard() {
  const classes = useStyles();
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    niv:'',
    et:'',
    col:'',
    est:''
  })
  //******  getAll colegios
      const getAll=async()=>{
        await axios.post(baseUrl,{
          _metod:       'getAllCountTutor',
          idOlimpiada:  cookies.get('idolimpiada')
        },header()
      ).then(
        response => {
          console.log(response);
          if(response.data.estado===1){
            setConsolaSeleccionada(response.data.val[0]);
          }
        }
      ).catch(
        error=>{
        }
      )
    };
  useEffect(()=>{
    getAll();
  },[]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon><DateRange/></Icon>
              </CardIcon>    
              <p className={classes.cardCategory}>Niveles</p>
              <h3 className={classes.cardTitle}>{consoleSeleccionada.niv}</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Etapas</p>
              <h3 className={classes.cardTitle}>{consoleSeleccionada.et}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon><DateRange/></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Colegios</p>
              <h3 className={classes.cardTitle}>{consoleSeleccionada.col}</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Estudiantes</p>
              <h3 className={classes.cardTitle}>{consoleSeleccionada.est}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
            </CardBody>
            <CardFooter chart>
            <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}