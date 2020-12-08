import React, { useEffect, useState,useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactExport from "react-export-excel";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button} from '@material-ui/core';

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import ListarEstudiantes from './ListarEstudiantes.js';
import AccordionActions from '@material-ui/core/AccordionActions';
import { Alert } from '@material-ui/lab';
const baseUrl_Grupos=HOST.Url_Admin+'Grupo.php';
const cookies = new Cookies();
//"../../variables/general.js";
//componentes de exel




const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const header = HOST.header(cookies.get('token'));
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
const getAll=useCallback(async()=>{
    //consoleSeleccionada.mensaje='';
    await axios.post(baseUrl_Grupos,{
        _metod: 'getAllAdmin',
        idNivel:        props.idnivel     
        
    },header
  ).then(
    response => {
      console.log("****************");
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
},[props]);
const getAprobadosPorEtapa = useCallback(async()=>{
  await axios.post(baseUrl_Grupos,{
    _metod: 'getAprobadosPorEtapa',
    idNivel:        props.idnivel,
    idEtapa:        props.idetapa-1   
  },header
  ).then(
    response => {
        console.log(response);
        if(response.data.estado===1)
            setData(response.data.val);
        else
            setData([]);
    }
    ).catch(
      error=>{
      alert(error+"");
    }
  )
},[props]);
    useEffect(()=>{
        
        console.log("props de paguina de Grupo");
        console.log(props);
        if(props.tipo==='1'){
          getAll();  
        }else{
          console.log("Hacemos cambios papu");
          getAprobadosPorEtapa();
        }
        //getAllEstudiantes();
        /**
        Nivel = {props.idnivel}<br/>
        etapa = {props.idetapa}
         */
      },[getAll,getAprobadosPorEtapa,props]);
    return (
    <div>

<TableContainer className={classes.content}>
        {(data.length===0)?<center><Alert severity="error">Esta Etapa no tiene Grupos!</Alert></center>:
       <div>
         <Alert severity="info">En este nivel tenemos <strong>{data.length}</strong> grupos!</Alert>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell><strong >idGrupo</strong></TableCell>
              <TableCell><strong ><center>Nombre</center></strong></TableCell>
              <TableCell><strong ><center>Colegio</center></strong></TableCell>
              <TableCell><strong ><center>Tutor</center></strong></TableCell>
              <TableCell><strong ><center>Integrantes</center></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(console =>(
              <TableRow key={console.idgrupo}>
                <TableCell>{console.idgrupo}</TableCell>
                <TableCell>{console.nombre}</TableCell>
                <TableCell>{console.nombre_col}<br/><strong>SIE:</strong> {console.sie}</TableCell>
                <TableCell>{console.tut}</TableCell>
                <TableCell><ListarEstudiantes idGrupo={console.idgrupo}/></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AccordionActions>

        <ExcelFile element={<Button color="primary"variant="outlined">Descargar en Excel</Button>} filename="Registro">
                <ExcelSheet  data={data} name="Ciudades mas pobladas">
                  <ExcelColumn label ="idgrupo" value="idgrupo"/>
                  <ExcelColumn label ="nombre" value="nombre"/>
                  <ExcelColumn label ="tutor" value="tut"/>
                </ExcelSheet>
            </ExcelFile>
      </AccordionActions>
      
      </div>
      }
      </TableContainer>
    </div>
  );
}

export default PaguinaResultados;
