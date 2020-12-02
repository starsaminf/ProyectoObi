
import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
//** WEB SERVISES */
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import {Table,  TableCell, TableRow, TableHead} from '@material-ui/core';

//**  EXPANDIBLE */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import ListIcon from '@material-ui/icons/List';
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
const baseUrl_grupo   = HOST.Url+'Grupo.php';
const cookies = new Cookies();
function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    paper2: {
      position: 'absolute',
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2, 4, 0),
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    icons: {
      cursos:'pointer'
    },
    inputMaterial:{
      width:'100%',
      backgroundColor: "#4CAF50",
      color: "#ffffff",
      textAlign: 'center',
      border: 'none',
    },
    button:{
      margin: theme.spacing(0.1),
    },
    gridList: {
      width: '100%',
      height: 200,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    
  }));
  function header(){
    return {
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  };
  
function GestionDeIntegrante(props) {
    const classes = useStyles();

    const [openAcordeon,  setOpenAcordeon]   = useState(true);
    const [data,  setData]   = useState([]);


      const [value, setValue] = useState('femenino');

      const handleAcordeon = () => {
        setOpenAcordeon(!openAcordeon);
      };
        //*** detenemos submit de formulario */
    
      //*** seleccionar consola */


//***   GET ALL Estudiants inscritos en cada grupo  */
const getAllEstudiantesDeGrupo=async()=>{
      await axios.post(baseUrl_grupo,{
        _metod:         'getAllEstudiantesDeGrupo',
        idGrupo:        props.idGrupo
      },header()
    ).then(
      response => {
        //console.log("datos*******************************");
        //console.log(response);
        if(response.data.estado===1){
          setData(response.data.val);
          //setConsolaSeleccionada(response.data.val);
          
        }else{
          setData([]);
        }
      }
    ).catch(
      error=>{
        alert(error);
      }
    )
  };
  
//***   GET ALL Estudiantes de cada tutor en la olimpiada  */


const ClickAcordeon= () =>{
  if(openAcordeon){
    getAllEstudiantesDeGrupo();
    handleAcordeon();
  }
}

function calcularEdad(fecha) {
  var hoy = new Date(cookies.get('fechalimiteedad'));
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}
useEffect(async()=>{
  //console.log(props);
  //console.log(calcularEdad('1990-08-02'));
},[]);
  return (
    <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={ClickAcordeon}
            >
            <Typography className={classes.heading}><ListIcon color="primary"/>     Estudiantes</Typography>
            </AccordionSummary>
            <div className={classes.content}>
            {(data.length===0&&data)?<Alert  severity="error">No se agrego Grupos a este nivel!</Alert>:
                
            <Table>
              <TableHead>
              
              {data.map(console =>(
                <TableRow key={console.rude}>
                  
                  <TableCell><FaceTwoToneIcon color="secondary"/></TableCell>
                  <TableCell>
                    <GridContainer >
                        <GridItem xs={12} sm={12} md={3}>
                          <strong>nombre:</strong>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9}>
                        {console.appaterno} {console.apmaterno} {console.nombre}
                        </GridItem>
                    </GridContainer>
                    <GridContainer >
                        <GridItem xs={12} sm={12} md={3}>
                          <strong>Rude:</strong>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9}>
                          {console.rude}
                        </GridItem>
                    </GridContainer>
                    <GridContainer >
                        <GridItem xs={12} sm={12} md={3}>
                          <strong>Carnet:</strong>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9}>
                          {console.ci}
                        </GridItem>
                    </GridContainer>
                  </TableCell>
                   
                </TableRow>
                ))}
              </TableHead>
              
            </Table>
            }

        </div>
        </Accordion>
    </div>
  );
}

export default GestionDeIntegrante;
