import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
import {Edit,Delete, Transform} from '@material-ui/icons';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import ListarEstudiantes from './ListarEstudiantes.js';
const baseUrl_Grupos=HOST.Url+'Grupo.php';
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
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    icons: {
      cursos:'pointer'
    },
    inputMaterial:{
      width:'100%'
    },
    root: {
      width: '100%',
    },
  }));


function PaguinaResultados(props) {
    const classes = useStyles();
    const [data,setData]=useState([]);

    //**      UPDATE  */
const getAll=async()=>{
    //consoleSeleccionada.mensaje='';
    await axios.post(baseUrl_Grupos,{
        _metod: 'getAllAdmin',
        idNivel:        props.idnivel     
        
    },header()
  ).then(
    response => {
        console.log(response);
        if(response.data.estado===1)
            setData(response.data.val);
        else
            setData([]);
      /*setConsolaSeleccionada(prevState=>({
        ...prevState,
        ['mensaje']:response.data.mensaje
      }))
      handleModalMensaje();*/
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
    useEffect(async()=>{
        getAll();
        //getAllEstudiantes();
        /**
        Nivel = {props.idnivel}<br/>
        etapa = {props.idetapa}
         */
      },[]);
    return (
    <div>
        {(data.length===0)?<center>no hay Grupos que mostrar</center>:
        <TableContainer className={classes.content}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell><strong >idGrupo</strong></TableCell>
              <TableCell><strong >Nombre</strong></TableCell>
              <TableCell><strong >Tutor</strong></TableCell>
              <TableCell><strong >Integrantes</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(console =>(
              <TableRow key={console.idgrupo}>
                <TableCell>{console.idgrupo}</TableCell>
                <TableCell>{console.nombre}</TableCell>
                <TableCell>{console.tut}</TableCell>
                <TableCell><ListarEstudiantes idGrupo={console.idgrupo}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  );
}

export default PaguinaResultados;
