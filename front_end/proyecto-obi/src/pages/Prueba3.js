import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
import {Edit,Delete, Transform} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
const baseUrl='http://localhost:4000/proyectoOBI/back_end/Usuario.php';

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
  }
}));
function header(){
  return {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};
export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [data,setData]=useState([
    {idusuario: 1, username: "vico", pasword: "e10adc3949ba59abbe56e057f20f883e", correo: "vicovillca@hotmail.com", usuarioautentificado: null},
    {idusuario: 2, username: "juan", pasword: "e10adc3949ba59abbe56e057f20f883e", correo: "vicovillca@hotmail.com", usuarioautentificado: null},
    {idusuario: 3, username: "blanca", pasword: "e10adc3949ba59abbe56e057f20f883e", correo: "vicovillca@hotmail.com", usuarioautentificado: null},
    {idusuario: 5, username: "blanquitaaa", pasword: "23456", correo: "chiquitagmail.com", usuarioautentificado: null},
    {idusuario: 7, username: "blanquitaaaa", pasword: "23456", correo: "chiquitagmail.com", usuarioautentificado: null},
    {idusuario: 8, username: "juan123456asas", pasword: "23456", correo: "chiquitagmail.com", usuarioautentificado: "false"},
  ]);
  
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idusuario:'',
    username:'',
    pasword:'',
    correo:'',
    mensaje:''
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
  const handleModalUpdate2 = (e) => {
    console.log(e.idusuario);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };
  const handleModalMensaje = () => {
    setOpenMensaje(!openModalMensaje);
  };
  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  setConsolaSeleccionada(consola);
  (caso==='Editar')?handleModalUpdate():handleModalDelete();
};

//******  getAll
  const getAll=async()=>{
      await axios.post(baseUrl,{_metod: 'getAll'},header()
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setData(response.data.admin);
        }
      }
    ).catch(
      error=>{
        console.log(error);
      }
    )
  };
  //*****   Insert */
  const Insert=async()=>{
    handleModalInsert();
    
      await axios.post(baseUrl,{
        _metod: 'Insert',
        UserName: consoleSeleccionada.username,
        Password:  consoleSeleccionada.pasword,
        Correo:   consoleSeleccionada.correo
      },header()
    ).then(
      response => {
        consoleSeleccionada.mensaje = response.data.mensaje;
        handleModalMensaje();
        if(response.data.estado===1){
          //setData(response.data.admin);
          getAll();
          consoleSeleccionada.username = '';
          consoleSeleccionada.pasword = '';
          consoleSeleccionada.correo = '';
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  };
//**      UPDATE  */
const Update=async()=>{
  handleModalUpdate();
  
    await axios.post(baseUrl,{
      _metod: 'Update',
      idUsuario: consoleSeleccionada.idusuario,
      UserName: consoleSeleccionada.username,
      Password:  consoleSeleccionada.pasword,
      Correo:   consoleSeleccionada.correo
    },header()
  ).then(
    response => {
      console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
        consoleSeleccionada.username = '';
        consoleSeleccionada.pasword = '';
        consoleSeleccionada.correo = '';
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
    getAll();
  },[]);


  return (
    <div>
      <div>
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Usuarios
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            id="buscar"
            label="buscar"
            name="buscar"
          />
            &nbsp;&nbsp;&nbsp;
          <Button type="submit" variant="contained" color="primary" onClick={handleModalInsert} >+ Agregar</Button>       
        </Toolbar>        
      </div>  
      
      <TableContainer className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>CORREO</TableCell>
              <TableCell>ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(console =>(
              <TableRow key={console.idusuario}>
                <TableCell>{console.idusuario}</TableCell>
                <TableCell>{console.username}</TableCell>
                <TableCell>{console.correo}</TableCell>
                <TableCell>
                  <Edit onClick={()=>{seleccionarConsola(console,'Editar')}} color="primary" />
                    &nbsp;&nbsp;&nbsp;
                  <Delete onClick={()=>{seleccionarConsola(console,'Eliminar')}} color="secondary"/>
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
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Agregar Nuevo Usuario</h3>
            <TextField name='username' required className={classes.inputMaterial} label="username"onChange={handleChangle} value={consoleSeleccionada.username}/>
            <br/>
            <TextField name='pasword' required className={classes.inputMaterial} label="pasword" onChange={handleChangle} value={consoleSeleccionada.pasword}/>
            <br/>
            <TextField name='correo' required className={classes.inputMaterial} label="correo" onChange={handleChangle} value={consoleSeleccionada.correo}/>
            <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={Insert} >Guardar</Button>
          </div>
        </Modal>





        <Modal
          open={openModalUpdate}
          onClose={handleModalUpdate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Editar Usuario</h3>
            <TextField name='idusuario' disabled={true} className={classes.inputMaterial} label="idusuario"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.idusuario}/>
            <br/>
            <TextField name='username' required className={classes.inputMaterial} label="username"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.username}/>
            <br/>
            <TextField name='correo' required className={classes.inputMaterial} label="correo" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.correo}/>
            <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={Update} >Guardar Cambios</Button>
          </div>
        </Modal>


        <Modal
          open={openModalDelete}
          onClose={handleModalDelete}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Eliminar Usuario</h3>
            <h4>En realidad desea eliminar el usuario?</h4>
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalDelete} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={handleModalDelete} >Guardar</Button>
          </div>
        </Modal>



        <Modal
          open={openModalMensaje}
          onClose={handleModalMensaje}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h1 id="simple-modal-title">Mensaje...</h1>
            <br/>
            <h4>{consoleSeleccionada.mensaje}</h4>
            <br/>
              <Button type="submit" className={classes.inputMaterial} variant="outlined" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
          </div>
        </Modal>
    </div>
  );
}
