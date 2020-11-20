import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';


import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
import {Edit,Delete, SupervisedUserCircle, Update} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
//radiooooo

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GestionarIntegrante from '../../components/GestionDeIntegrante.js';
import GestionDeIntegrantes from '../../components/GestionDeIntegrante.js';
// host variables
const baseUrl_estudiante   = HOST.Url+'Estudiante.php';
const baseUrl_Grupo      = HOST.Url+'Grupo.php';
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
  const [openModalUpdate,   setOpenUpdate]    = useState(false);
  const [openModalDelete,   setOpenDelete]    = useState(false);
  const [openModalMensaje,  setOpenMensaje]   = useState(false);
  const [grupos,  setGrupos]   = useState([]);
  const [grupos2,  setGrupos2]   = useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idGrupo:'',
    nombre:'',
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
      var cad= (item.nombre).toString().toLowerCase(); 
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
    //*** detenemos submit de formulario */

  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  setConsolaSeleccionada(consola);
    if(caso==='Editar'){
      handleModalUpdate();
    }else{
      handleModalDelete();
    }
};

//******  getAll Colegio

//***   GET ALL GRUPO */

const getAllGrupo=async()=>{
  //console.log("getAll estudiantes por tutor y olimpiada");
    await axios.post(baseUrl_Grupo,{
      _metod:       'getAll',
      idOlimpiada:  cookies.get('idolimpiada'),
      idNivel:  props.idnivel,
      idTutor:  cookies.get('idusuario'),
    },header()
  ).then(
    response => {
      //console.log(response);
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
  event.preventDefault();
  handleModalInsert();
    await axios.post(baseUrl_Grupo,{
      _metod: 'Insert',
      idNivel:  props.idnivel,
      idTutor:  cookies.get('idusuario'),
      Nombre:consoleSeleccionada.nombre
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

//******  se ejecuta cuando inicia el Componente
  useEffect(async()=>{
    getAllGrupo();
  },[]);


  return (
    <div>
      <div>
        En este Nivel solo se permite <strong>{props.limiteporgrupo}</strong>  integrantes por Grupo, con edad menor o igual a <strong> {props.limiteporedad}</strong>  años hasta <strong>  {props.fechaMax}</strong> <br/>
        <strong>Paso 1.-</strong> Cree un Grupo Nuevo<br/>
        <strong>Paso 2.-</strong> Agrege los estudiantes pertenecientes a cada grupo
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
            &nbsp;&nbsp;&nbsp;
          <Button type="submit" variant="contained" color="primary" onClick={handleModalInsert} >+ Crear Grupo nuevo</Button>       
        </Toolbar>        
      </div>  
      <TableContainer className={classes.content}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell><strong >id</strong></TableCell>
              <TableCell><strong >Nombre de Grupo</strong></TableCell>
              <TableCell><strong ><center>Integrante</center></strong></TableCell>
              <TableCell><center><strong >Acciones</strong></center></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grupos2.map(console =>(
              <TableRow key={console.idgrupo}>
                <TableCell>{console.idgrupo}</TableCell>
                <TableCell>{console.nombre}</TableCell>
                <TableCell><GestionDeIntegrantes idGrupo={console.idgrupo} limiteporgrupo={props.limiteporgrupo} limiteporedad={props.limiteporedad}/></TableCell>
                <TableCell>
                  <center>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={()=>{seleccionarConsola(console,'Editar')}}
                    >
                      <Edit/>
                  </Button><br/>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={()=>{seleccionarConsola(console,'Eliminar')}}
                    >
                      <Delete/>
                  </Button>
                  </center>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Modal
          open={openModalInsert}
          onClose={handleModalInsert}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
              <h3 id="simple-modal-title">Crear Grupo</h3>
              <div >
              <form onSubmit={InsertGrupo} >
                  
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre de Grupo"
                        name="nombre"
                        onChange={handleChangle}
                      />
                      </GridItem>
                  </GridContainer>
                  <strong>Nota:</strong> Si el grupo contiene solo un integrante coloque el nombre de grupo como apPaterno-apMaterno-Nombres del estudiante
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                        <Toolbar>
                          <Typography variant="h2" noWrap className={classes.title}>
                          </Typography>
                          <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button type="submit"  variant="contained" color="primary"  >Guardar</Button>
                        </Toolbar> 
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                    
                  </GridContainer>

              
              </form>
              </div>
            </div>
          
        </Modal>

        <Modal
          open={openModalUpdate}
          onClose={handleModalUpdate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
              <h3 id="simple-modal-title">Editar Nombre de Grupo</h3>
              <form  onSubmit={UpdateGrupo}>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="nombre"
                          label="Nombre de Grupo"
                          name="nombre"
                          value={consoleSeleccionada&&consoleSeleccionada.nombre}
                          onChange={handleChangle}
                        />
                      </GridItem>
                  </GridContainer>
                  
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                        <Toolbar>
                          <Typography variant="h2" noWrap className={classes.title}>
                          </Typography>
                          <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button type="submit"  variant="contained" color="primary"  >Guardar</Button>
                        </Toolbar> 
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                    
                  </GridContainer>

              
              </form>
            </div>
        </Modal>


        <Modal
          open={openModalDelete}
          onClose={handleModalDelete}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
            <h1 id="simple-modal-title"><strong>Eliminar:</strong></h1>
                <br/>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={12}>
                        En realidad desea eliminar el grupo con nombre: <br/>
                        <strong >nombre:</strong>{consoleSeleccionada.nombre}<br/>
                    </GridItem>
                </GridContainer>
                <br/>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={4}>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button type="submit" variant="outlined" color="primary" onClick={handleModalDelete} >Cancelar</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button type="submit" variant="contained" color="primary"  onClick={Eliminar}>Eliminar</Button>
                    </GridItem>
                </GridContainer>
          </div>
        </Modal>
        <Modal
          open={openModalMensaje}
          onClose={handleModalMensaje}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
            <h1 id="simple-modal-title"><strong>Mensaje:</strong></h1>
            <br/>
            <h4>{consoleSeleccionada.mensaje}</h4>
            <br/>
              <Button type="submit" className={classes.inputMaterial} variant="outlined" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
          </div>
        </Modal>
    </div>
  );
}
