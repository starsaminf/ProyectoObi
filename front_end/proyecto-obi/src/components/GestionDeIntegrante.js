
import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
//** WEB SERVISES */
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Table,  TableCell, TableBody, TableRow, Modal} from '@material-ui/core';
//**  EXPANDIBLE */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const baseUrl_grupo   = HOST.Url+'Grupo.php';
const baseUrl_estudiante   = HOST.Url+'Estudiante.php';
const baseUrl_Integrante_de   = HOST.Url+'Integrante_de.php';
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
  
function GestionDeIntegrantes(props) {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [openModalInsert,   setOpenInsert]    = useState(false);
    const [openModalUpdate,   setOpenUpdate]    = useState(false);
    const [openModalDelete,   setOpenDelete]    = useState(false);
    const [openModalMensaje,  setOpenMensaje]   = useState(false);
    const [openAcordeon,  setOpenAcordeon]   = useState(true);
    const [data,  setData]   = useState([]);
    const [estudiantes,  setEstudiantes]   = useState([]);
    const [consoleSeleccionada, setConsolaSeleccionada]= useState({
        idestudiante:''
      })
      const handleChangle = e => {
        const {name, value}= e.target;
        setConsolaSeleccionada(prevState=>({
          ...prevState,
          [name]:value
        }))
      }
      const handleModalInsert = () => {
        setOpenInsert(!openModalInsert);
      };
      const handleModalUpdate = () => {
        setOpenUpdate(!openModalUpdate);
      };
      const handleModalDelete = () => {
        setOpenDelete(!openModalDelete);
      };
      const handleModalMensaje = () => {
        setOpenMensaje(!openModalMensaje);
      };
      const handleAcordeon = () => {
        setOpenAcordeon(!openAcordeon);
      };
        //*** detenemos submit de formulario */
    
      //*** seleccionar consola */
    const seleccionarConsola =(consola,caso)=>{
      console.log("Sleccionamos consola");
      consoleSeleccionada.idestudiante=consola.idestudiante;
        if(caso==='Borrar'){
          BorrarParticipacion();
        }else{
          InsertarParticipacion();
        }
    };

//***   GET ALL Estudiants inscritos en cada grupo  */
const getAllEstudiantesDeGrupo=async()=>{
      await axios.post(baseUrl_grupo,{
        _metod:         'getAllEstudiantesDeGrupo',
        idGrupo:        props.idGrupo
      },header()
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setData(response.data.val);
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
const getAllEstudiantesPorTutor=async()=>{
    await axios.post(baseUrl_estudiante,{
      _metod:           'getAllEstudiantesDeTutor',
      idTutor:          cookies.get('idusuario'),
      idOlimpiada:      cookies.get('idolimpiada')
    },header()
  ).then(
    response => {
      console.log("estudiantessss")
      console.log(response);
      if(response.data.estado===1){
        setEstudiantes(response.data.val);
      }else{
        setEstudiantes([]);
      }
    }
  ).catch(
    error=>{
      alert(error);
    }
  )
};
//**Borrar Integrante */
const BorrarParticipacion=async()=>{
  console.log(consoleSeleccionada);
  await axios.post(baseUrl_Integrante_de,{
    _metod:           'Delete',
    idEstudiante:     consoleSeleccionada.idestudiante,
    idGrupo:          props.idGrupo
  },header()
).then(
  response => {
    console.log(response);
    if(response.data.estado===1){
      getAllEstudiantesDeGrupo();
      //setData(response.data.val);
    }else{
      //setData([]);
    }
  }
).catch(
  error=>{
    alert(error);
  }
)
};
//**Insert  Integrante */
const InsertarParticipacion=async()=>{
  handleModalInsert();
  console.log(consoleSeleccionada);
  await axios.post(baseUrl_Integrante_de,{
    _metod:           'Insert',
    idEstudiante:     consoleSeleccionada.idestudiante,
    idGrupo:          props.idGrupo
  },header()
).then(
  response => {
    console.log(response);
    if(response.data.estado===1){
      getAllEstudiantesDeGrupo();
      //setData(response.data.val);
    }else{
    }
  }
).catch(
  error=>{
    alert(error);
  }
)
};
//**Abri Modulo para agregar un participoante */
const AgregarParticipante =async()=>{
  console.log("Agrenamos Participante");
  setEstudiantes([]);
  handleModalInsert();
  getAllEstudiantesPorTutor();
}
const ClickAcordeon= () =>{
  if(openAcordeon){
    getAllEstudiantesDeGrupo();
    handleAcordeon();
  }
}
useEffect(async()=>{
  console.log("Props ****");
    console.log(props);
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
            <Typography className={classes.heading}>Estudiantes</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {(data.length===0)?<Alert severity="error">Este grupo no tiene integrantes!</Alert>:''}
            <div className={classes.content}>
            <Table>
            <TableBody>
                {data.map(console =>(
                <TableRow key={console.idestudiante}>
                    <TableCell>{console.appaterno} {console.apmaterno} {console.nombre}<br/><strong>Rude:</strong>{console.rude}</TableCell>
                    <TableCell>
                        <HighlightOffIcon onClick={()=>{seleccionarConsola(console,'Borrar')}} color="secondary"/>
                        
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        {
            (data.length<props.limiteporgrupo)?<Button className={classes.inputMaterial} onClick={AgregarParticipante} variant="contained"color="default"><PersonAddIcon/>{(data.length===0)?'':"Agregar Estudiante"}</Button>:''
        }
        </div>
            </AccordionDetails>
        </Accordion>
    
    
    
    
        <Modal
          open={openModalInsert}
          onClose={handleModalInsert}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
            <h3 id="simple-modal-title">Agregar Estudiante al Grupo</h3>
            <div className={classes.content}>
              <Table>
                <TableBody>
                    {estudiantes.map(console =>(
                    <TableRow key={console.idestudiante}>
                        <TableCell><strong>Nombre:</strong>{console.appaterno} {console.apmaterno} {console.nombre}<br/><strong>Rude:</strong>{console.rude}<br/>{console.edad}</TableCell>
                        <TableCell>
                          {(console.edad<=props.limiteporedad&&console.ngrupos===0)?<Button onClick={()=>{seleccionarConsola(console,'Agregar')}} color='primary'><HighlightOffIcon color='primary'/>Agregar </Button>:'Restringido por la edad o ya tiene grupo'}
                        </TableCell>
                    </TableRow>
                    ))}
                    {(estudiantes.length===0)?<Alert severity="error">Usted no tiene ningun estudiante para agregar a este grupo, para seleccionar sus estudiantes dirijase a la pestaña <strong>Mis estudiantes</strong> del lado izquierdo y seleccione <strong>+ AGREGAR</strong> estudiante!</Alert>:''}
                <br/>
                </TableBody>
              </Table>
            <div/>
          </div>
          </div>
        </Modal>
    
    
    
    
    
    </div>
  );
}

export default GestionDeIntegrantes;
