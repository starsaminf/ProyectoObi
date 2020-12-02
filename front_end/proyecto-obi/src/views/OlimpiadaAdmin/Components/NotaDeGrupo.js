
import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
//** WEB SERVISES */
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {Table,  TableCell, TableBody, TableRow, Modal} from '@material-ui/core';
//**  EXPANDIBLE */
const baseUrl_nota   = HOST.Url+'Nota.php';
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
  
function NotaDeGrupo(props) {
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
        rude:''
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
    

//***   GET ALL Estudiants inscritos en cada grupo  */
const getAllNotaDeGrupo=async()=>{
      await axios.post(baseUrl_nota,{
        _metod:         'getById',
        idGrupo:        props.idGrupo,
        idEtapa:        props.idEtapa
      },header()
    ).then(
      response => {
        console.log(response);
        /*if(response.data.estado===1){
          setData(response.data.val);
        }else{
          setData([]);
        }*/
      }
    ).catch(
      error=>{
        alert(error);
      }
    )
  };
  



useEffect(async()=>{
    console.log("******Nota de GRupo");
    console.log(props);
},[]);
  return (
    <div>
        <Button variant="outlined" color="primary" onClick={getAllNotaDeGrupo}>Agregar</Button>
    
    
    
    
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
                    <TableRow key={console.rude}>
                        <TableCell><strong>Nombre:</strong>{console.appaterno} {console.apmaterno} {console.nombre}<br/><strong>Rude:</strong>{console.rude}<br/>{console.edad}</TableCell>
                        
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

export default NotaDeGrupo;
