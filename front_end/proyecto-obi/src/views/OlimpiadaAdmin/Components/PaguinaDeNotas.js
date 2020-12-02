import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactExport from "react-export-excel";
import { TableContainer, Button} from '@material-ui/core';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import AccordionActions from '@material-ui/core/AccordionActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import PublicarNota from './PublicarNota.js';

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


function PaguinaResultados(props) {
    const classes = useStyles();
    const [data,setData]=useState([]);

    //**      UPDATE  */
const getAll=async()=>{
    //consoleSeleccionada.mensaje='';
    await axios.post(baseUrl_Grupos,{
        _metod: 'getGrupoConNotas',
        idNivel:        props.idnivel,     
        idEtapa:        props.idetapa
    },header()
  ).then(
    response => {
        //console.log(response);
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
const getAprobadosPorEtapa = async()=>{
  await axios.post(baseUrl_Grupos,{
    _metod: 'getAprobadosPorEtapa',
    idNivel:        props.idnivel,
    idEtapa:        props.idetapa-1   
  },header()
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
}
    useEffect(async()=>{
      if(props.tipo==='1'){
        getAll();  
      }else{
        console.log("Hacemos cambios papu");
        getAprobadosPorEtapa();
      }
      },[]);
    return (
    <div>

<TableContainer className={classes.content}>
        {(data.length===0)?<center><Alert severity="error">Esta Etapa no tiene Grupos!</Alert></center>:
       <div>
         <Alert severity="info">
            <AlertTitle>Información</AlertTitle>
            Para agregar las notas a este nivel y etapa descarge el Formulario de notas y una ves rellenado los espacios seleccione subir notas  !
            - Cada ves que suba al archivo de notas, se limpiara todas las notas y se actualizara con las notas subidas en el ultimo archivo   
            <br/>
            <strong>Detalles:</strong><br/>
            <strong>Puesto:</strong> la ubicacion en la tabla de pociciones<br/>
            <strong>Estado:</strong> Aprobado o Reprobado para la siguiente etapa<br/>
            <strong>Observaciones:</strong> Podria colocar cuantos problemas resolvio o puntos acumulo
          </Alert>
        <AccordionActions>
        <ExcelFile element={<Button color="primary"variant="outlined">Descargar Formulario de Notas</Button>} filename="Registro">
                <ExcelSheet  data={data} name="FormularioNotas">
                  <ExcelColumn label ="idgrupo" value="idgrupo"/>
                  <ExcelColumn label ="nombre" value="nombre"/>
                  <ExcelColumn label ="colegio" value="col"/>
                  <ExcelColumn label ="puesto" value="puesto"/>
                  <ExcelColumn label ="estado" value="estado"/>
                  <ExcelColumn label ="observaciones" value="observaciones"/>
                </ExcelSheet>
            </ExcelFile>
      </AccordionActions>
      <AccordionActions>
        <PublicarNota idNivel={props.idnivel} idEtapa={props.idetapa}/>
      </AccordionActions>
      
      </div>
      }
      </TableContainer>
    </div>
  );
}

export default PaguinaResultados;
