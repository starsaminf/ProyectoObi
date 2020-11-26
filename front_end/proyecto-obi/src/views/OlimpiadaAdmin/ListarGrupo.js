import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input, Divider} from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import ListaDeIntegrantes from './Components/ListaDeIntegrantes.js';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import Grafico from './Components/Grafico.js';
// host variables
const baseUrl_Grupo      = HOST.Url+'Grupo.php';
const baseUrl_colegio      = HOST.Url+'Colegio.php';
//"../../variables/general.js";
const cookies = new Cookies();
//************************** */



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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper3: {
    position: 'absolute',
    width: '50%',
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
  button:{
    margin: theme.spacing(0.1),
  },
  gridList: {
    width: '100%',
    height: 200,
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

export default function IncribirParticipanteIndividual(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert,   setOpenInsert]    = useState(false);
  const [openModalEstadistica,   setOpenEstadistica]    = useState(false);
  const [openModalUpdate,   setOpenUpdate]    = useState(false);
  const [openModalDelete,   setOpenDelete]    = useState(false);
  const [openModalMensaje,  setOpenMensaje]   = useState(false);
  const [grupos,  setGrupos]   = useState([]);
  const [grupos2,  setGrupos2]   = useState([]);
  const [colegios,      setColegio]  =useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idGrupo:'',
    nombre:'',
    mensaje:'',
    sie:'',
    colegio:'Indefinido',
    colegiovalido:false,
    mensaje:''
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleChangleBuscador = e => {
    e=(e.target.value).toLowerCase();

    var search = grupos.filter(item=>{
      var cad= (item.nombre+item.nombre_col+item.nombre_col).toString().toLowerCase(); 
      if(cad.includes(e))
        return item;
    });
    setGrupos2(search);
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
  const handleModalEstadistica = () => {
    setOpenEstadistica(!openModalEstadistica);
  };
    //*** detenemos submit de formulario */

  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  console.log("ESTADISTICA");
  setConsolaSeleccionada(consola);
    if(caso==='Estadistica'){
      handleModalEstadistica();
    }
};

//******  getAll Colegio

//***   GET ALL GRUPO */

const getAllGrupo=async()=>{
  //console.log("getAll estudiantes por tutor y olimpiada");
    await axios.post(baseUrl_Grupo,{
      _metod:       'getAllAdmin',
      idOlimpiada:  cookies.get('idolimpiada'),
      idNivel:      props.idnivel,
      idTutor:      cookies.get('idusuario'),
    },header()
  ).then(
    response => {
      console.log("VALLLLLLSSDKJBKJJH");
      console.log(response);
      if(response.data.estado===1){
        setGrupos(response.data.val);
        setGrupos2(response.data.val);
      }else{
        setGrupos([]);
        setGrupos2([]);
      }
    }
  ).catch(
    error=>{
      alert(error);
    }
  )
};
//***   INSERTAR GRUPO */
const InsertGrupo=async(event)=>{
  handleModalInsert();
    await axios.post(baseUrl_Grupo,{
      _metod:       'Insert',
      idNivel:      props.idnivel,
      idTutor:      cookies.get('idusuario'),
      idOlimpiada:  cookies.get('idolimpiada'),
      Sie:          consoleSeleccionada.sie,
      Nombre:       consoleSeleccionada.nombre
    },header()
  ).then(
    response => {
      //console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        getAllGrupo();
        //getAll_Por_Tutor_y_Olimpiada();
        //setData(response.data.admin);
        //getAll();
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
const UpdateGrupo=async(event)=>{
  //console.log("Update");

  event.preventDefault();
  //console.log(consoleSeleccionada);
  handleModalUpdate();
    await axios.post(baseUrl_Grupo,{
      _metod: 'Update',
      idGrupo: consoleSeleccionada.idgrupo,
      Nombre:consoleSeleccionada.nombre
    },header()
  ).then(
    response => {
      //console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        getAllGrupo();
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};

const Eliminar=async()=>{
  handleModalDelete();
  //console.log("Eliminar");
    await axios.post(baseUrl_Grupo,{
      _metod: 'Delete',
        idGrupo: consoleSeleccionada.idgrupo
    },header()
  ).then(
    response => {
      //console.log(response);
      //console.log(consoleSeleccionada);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        getAllGrupo();
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
//** Buscamos elcolegio */
const buscarColegio = e => {
  var search = colegios.filter(item=>{
    //p.*, e.nombre as nom_est,c.nombre as nom_col
    var cad= item.sie; 
    if(cad===e.target.value){
      return item.nombre;
    }
  });
  var estado="Indefinido";
  var idcol='';
  var b=false;
  if(search.length===1){
    estado = search[0].nombre;
    idcol = search[0].sie;
    b=true;
  }
 
  setConsolaSeleccionada(prevState=>({
    ...prevState,
    ['colegio']:""+estado
  }))
  setConsolaSeleccionada(prevState=>({
    ...prevState,
    ['sie']:idcol
  }))
  setConsolaSeleccionada(prevState=>({
    ...prevState,
    ['colegiovalido']:b
  }))

  //if(search)
  //setParticipante2(search);
}
//******  getAll Colegio
const getAllColegios=async()=>{
  //console.log("getAll Colegio");
    await axios.post(baseUrl_colegio,{
      _metod: 'getAllSimple'
    },header()
  ).then(
    response => {
      //console.log(response);
      if(response.data.estado===1){
        setColegio(response.data.val);
      }
    }
  ).catch(
    error=>{
      alert(error);
      setColegio([]);
    }
  )
};
/*** Buscamos el colegio por el sie */
const ValidarGrupo = event => {
  event.preventDefault();//cancelamos los eventos 
  if(consoleSeleccionada.colegiovalido){
    //console.log("Colegio vALIDO");
    InsertGrupo();
    //Buscamos si yaes participante devolvemos si esta registrado y si esta participando
    //true:mostramos que ya tiene tutor
    //else:creamos o modificamos estudiante 
  }else{
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      ['mensaje']:"Ingrese el Sie de un Colegio Valido"
    }))
    handleModalMensaje();
  }
};
//******  se ejecuta cuando inicia el Componente
  useEffect(async()=>{
    getAllGrupo();
    getAllColegios();
  },[]);


  return (
    <div>
      <div>
        En este Nivel solo se permite <strong>{props.limiteporgrupo}</strong>  integrantes por Grupo, con edad menor o igual a <strong> {props.limiteporedad}</strong>  años hasta <strong>  {props.fechaMax}</strong> <br/>
        
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Grupos
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            id="buscar"
            label="buscar"
            name="buscar"
            onChange={handleChangleBuscador}
          />
          
        </Toolbar>        
      </div>  
      
      <TableContainer className={classes.content}>
      {(grupos2.length===0&&grupos)?<Alert  severity="error">No se agrego Grupos a este nivel!</Alert>:
                
              
        <Table>
          <TableHead >
         
            <TableRow >
              <TableCell><strong >codigo</strong></TableCell>
              <TableCell><strong >Nombre de Grupo</strong></TableCell>
              <TableCell><strong >Colegio/Sie</strong></TableCell>
              <TableCell><strong >Tutor</strong></TableCell>
              <TableCell><strong ><center>Integrante</center></strong></TableCell>
              <TableCell><strong ><center>Reporte</center></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {grupos2.map(console =>(
              <TableRow key={console.idgrupo}>
                <TableCell><center>{console.idgrupo}</center></TableCell>
                <TableCell>{console.nombre}</TableCell>
                <TableCell>{console.nombre_col}<br/><strong>Sie: </strong>{console.sie}</TableCell>
                <TableCell>{console.tut}</TableCell>
                <TableCell><ListaDeIntegrantes idGrupo={console.idgrupo} limiteporgrupo={props.limiteporgrupo} limiteporedad={props.limiteporedad}/></TableCell>
                <TableCell><Button color="primary"  variant="contained" onClick={()=>{seleccionarConsola(console,'Estadistica')}}><TimelineSharpIcon/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        }
      </TableContainer>



      <Modal
          open={openModalEstadistica}
          onClose={handleModalEstadistica}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper3}>
              <h3 id="simple-modal-title">Crear Grupo</h3>
              <div >
              <Grafico/>
              </div>
            </div>
          
        </Modal>
    </div>
  );
}
