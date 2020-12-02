import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactExport from "react-export-excel";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';

const baseUrl_Grupos=HOST.Url+'Grupo.php';
//"../../variables/general.js";
const cookies = new Cookies();
//componentes de exel

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
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


function Score(props) {
    const classes = useStyles();
    const [data,setData]=useState([]);

    //**      UPDATE  */
const getGrupoConNotas=async()=>{
    //consoleSeleccionada.mensaje='';
    await axios.post(baseUrl_Grupos,{
        _metod: 'getGrupoConNotas',
        idNivel:        props.idnivel,     
        idEtapa:        props.idetapa
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
const getGrupoConNotasCondicionado = async()=>{
  //consoleSeleccionada.mensaje='';
  await axios.post(baseUrl_Grupos,{
    _metod: 'getGrupoConNotasCondicionado',
    idNivel:        props.idnivel,     
    idEtapa:        props.idetapa
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
}
    useEffect(async()=>{
      if(props.tipo==='1'){
        getGrupoConNotas();  
      }else{
        console.log("Hacemos cambios papu");
        getGrupoConNotasCondicionado();
      }
      },[]);
    return (
    <div>

<TableContainer className={classes.content}>
        {(data.length===0)?<center><Alert severity="error">Esta Etapa no tiene Grupos!</Alert></center>:
       <div>
         <Alert severity="info">
            <AlertTitle>Información</AlertTitle>
          </Alert>
          <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong><center>#</center></strong> </TableCell>
                        <TableCell><strong><center>Score</center></strong> </TableCell>
                        <TableCell><strong><center>Grupo</center></strong> </TableCell>
                        <TableCell><strong><center>Colegio</center></strong> </TableCell>
                        <TableCell><strong><center>Estado</center></strong> </TableCell>
                        
                    </TableRow>
                </TableHead>
              <TableBody>
              {data.map(console =>(
                <TableRow key={console.idgrupo}>
                  
                    <TableCell><center>{console.puesto}</center></TableCell>
                    <TableCell><center>{console.observaciones}</center></TableCell>
                    <TableCell><center>{console.nombre}</center></TableCell>
                    <TableCell><center>{console.col}</center></TableCell>
                    <TableCell>
                        
                        {(console.estado==='Aprobado')?<Alert severity="success"><AlertTitle>{console.estado}</AlertTitle></Alert>:''}
                        {(console.estado==='Reprobado')?<Alert severity="error"><AlertTitle>{console.estado}</AlertTitle></Alert>:''}
                    
                    </TableCell>
                </TableRow>
                ))}
              </TableBody>
              
            </Table>

      
      </div>
      }
      </TableContainer>
    </div>
  );
}

export default Score;
