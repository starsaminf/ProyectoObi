import React,{ useEffect, useState } from "react";
// react plugin for creating chart
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input, Divider} from '@material-ui/core';


import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";


// ##############################
// // // javascript library for creating charts
// #############################
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';

import { Alert, AlertTitle } from '@material-ui/lab';
const useStyles = makeStyles(styles);
var Chartist = require("chartist");
// ##############################
// // // variables used to create animation on charts
// #############################
const baseUrlNota=HOST.Url+'Nota.php';
const baseUrlEtapa=HOST.Url+'Etapa.php';
//"../../variables/general.js";
const cookies = new Cookies();
function header(){
  return {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};
export default function Grafico(props) {
  const classes = useStyles();
  const [nota,setNota]=useState([]);
  const [etapa,setEtapa]=useState([]);
  //#########################
  const getAllNotas=async()=>{
    await axios.post(baseUrlNota,{
        _metod:         'getAllporGrupo',
        idGrupo:         props.idGrupo
    },header()
  ).then(
    response => {
      if(response.data.estado===1){
        setNota(response.data.val);
        
      }
      getAllEtapas();
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
  };
  const buscarNota = id => {
  
    var resp = nota.filter(item=>{
      if(item.idetapa===id)
        return item;
    });
    if(resp.length>=1)
      return (resp[0].puesto);
    else
      return "-";
  }
  const buscarObservaciones = id => {
  
    var resp = nota.filter(item=>{
      if(item.idetapa===id)
        return item;
    });

    if(resp.length>=1)
      return (resp[0].observaciones);
    else
      return "-";
  }
  const buscarEstado = id => {
  
    var resp = nota.filter(item=>{
      if(item.idetapa===id)
        return item;
    });

    if(resp.length>=1)
      return (resp[0].estado);
    else
      return "-";
  }
  //#########################
  const getAllEtapas=async()=>{
    await axios.post(baseUrlEtapa,{
        _metod:         'getAll',
        idOlimpiada:    cookies.get('idolimpiada')
    },header()
  ).then(
    response => {
      if(response.data.estado===1){
        setEtapa(response.data.val);
      }else{
        alert("no se encontraron las etapas");
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
  };
  //####################
  useEffect(async()=>{
    //llamamos todas las etapas
    getAllNotas();
    },[]);
  return (
    <div>
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Notas de Grupo</h4>
              <p className={classes.cardCategoryWhite}>
                por etapa
              </p>
            </CardHeader>
            <CardBody>
            <Table>
          <TableHead >
         
            <TableRow >
              <TableCell><strong ><center>etapa</center></strong></TableCell>
              <TableCell><strong ><center>puesto</center></strong></TableCell>
              <TableCell><strong ><center>detalle</center></strong></TableCell>
              <TableCell><strong ><center>estado</center></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {etapa.map(console =>(
              <TableRow key={console.idetapa}>
                <TableCell>{console.nombre}</TableCell>
                <TableCell><center>{buscarNota(console.idetapa)}</center></TableCell>
                <TableCell><center>{buscarObservaciones(console.idetapa)}</center></TableCell>
                <TableCell>
                  <center>
                    {(buscarEstado(console.idetapa)==='Aprobado')?<Alert severity="success"><AlertTitle>{buscarEstado(console.idetapa)}</AlertTitle></Alert>:''}
                    {(buscarEstado(console.idetapa)==='Reprobado')?<Alert severity="error"><AlertTitle>{buscarEstado(console.idetapa)}</AlertTitle></Alert>:''}
                    {(buscarEstado(console.idetapa)==="-")?'-':''}
                  </center>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}