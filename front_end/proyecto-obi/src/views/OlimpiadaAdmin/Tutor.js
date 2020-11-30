import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input, Radio} from '@material-ui/core';
import {Edit,Delete, Transform} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
//radiooooo

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// host components
const baseUrl=HOST.Url+'Tutor.php';
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

export default function Tutor() {
  //const baseUrl = HOST.Url+"Noticia.php";
  //const idAdmin='1';
  const classes = useStyles();
  const [value, setValue] = useState('individual');

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [data,setData]=useState([]);
  const [data2,setData2]=useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idtutor:'',
    nombre:'',
    appaterno:'',
    apmaterno:'',
    ci:'',
    correo:'',
    celular:''
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleChangleBuscador = e => {
    
    //console.log(e.target.value);
    var search = data.filter(item=>{
      var cad= item.idnivel+item.nombre+item.descripcion; 
      if(cad.includes(e.target.value))
        return item;
    });
    //console.log(search);
    setData2(search);
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
  const handleSubmit = event =>{
    event.preventDefault();
    Insert();
    //ejecutamos el axios
  }
  const handleSubmitUpdate = event =>{
    event.preventDefault();
    Update();
    //ejecutamos el axios
  }
  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  setConsolaSeleccionada(consola);
  (caso==='Editar')?handleModalUpdate():handleModalDelete();
};

//******  getAll
  const getAll=async()=>{
      await axios.post(baseUrl,{_metod: 'getAll',idOlimpiada :cookies.get('idolimpiada')},header()
    ).then(
      response => {
        //console.log(response);
        if(response.data.estado===1){
          setData(response.data.val);
          setData2(response.data.val);
        }else{
          setData([]);
          setData2([]);
        }
      }
    ).catch(
      error=>{
        setData2(data);
        //console.log(error);
      }
    )
  };
  //*****   Insert */
  const Insert=async()=>{
    handleModalInsert();
      await axios.post(baseUrl,{
        _metod:           'Insert',
        Nombre:           consoleSeleccionada.nombre,
        Descripcion:      consoleSeleccionada.descripcion,
        LimiteEdad:       consoleSeleccionada.limiteedad,
        LimitePorGrupo:   consoleSeleccionada.limiteporgrupo,
        idOlimpiada:      cookies.get('idolimpiada')
      },header()
    ).then(
      response => {
        //console.log(response);
        consoleSeleccionada.mensaje = response.data.mensaje;
        handleModalMensaje();
        if(response.data.estado===1){
          //setData(response.data.admin);
          getAll();
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
      _metod:           'Update',
      idNivel:          consoleSeleccionada.idnivel,
      Nombre:           consoleSeleccionada.nombre,
      Descripcion:      consoleSeleccionada.descripcion,
      LimiteEdad:       consoleSeleccionada.limiteedad,
      LimitePorGrupo:   consoleSeleccionada.limiteporgrupo,
      idOlimpiada:      cookies.get('idolimpiada')
    },header()
  ).then(
    response => {
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
//** eliminar
const Eliminar=async()=>{
  handleModalDelete();
  
    await axios.post(baseUrl,{
      _metod: 'Delete',
        idOlimpiada:    cookies.get('idolimpiada'),
        idNivel: consoleSeleccionada.idnivel
    },header()
  ).then(
    response => {
      
      //console.log("asaasas");
      //console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
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
            Tutores
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
          <Button type="submit" variant="contained" color="primary" onClick={handleModalInsert} >+ Agregar</Button>       
        </Toolbar>        
      </div>  
      <TableContainer className={classes.content}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell><strong ><center>idTutor</center></strong></TableCell>
              <TableCell><strong >Nombre </strong></TableCell>
              <TableCell><strong ><center>Carnet</center></strong></TableCell>
              <TableCell><strong ><center>Correo</center></strong></TableCell>
              <TableCell><strong ><center>Celular</center></strong></TableCell>
              <TableCell><strong ><center>Colegios</center></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map(console =>(
              <TableRow key={console.idtutor}>
                <TableCell><center>{console.idtutor}</center></TableCell>
                <TableCell><strong >{console.nombre}</strong></TableCell>
                <TableCell><center>{console.ci}</center></TableCell>
                <TableCell><center>{console.correo}</center></TableCell>
                <TableCell><center>{console.celular}</center></TableCell>
                <TableCell><center><Button  color="primary" > Lista de Colegios</Button></center></TableCell>
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
              <h3 id="simple-modal-title">Agregar Nuevo Nivel</h3>
              <form onSubmit={handleSubmit}>
                  <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre del Nivel"  onChange={handleChangle}/>
                  
                  <TextField variant="outlined"  multiline={true} rows={5} margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Descripcion del nivel"  onChange={handleChangle} />
                  
        
                  <GridContainer>
                    <GridItem  xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="limiteporgrupo"
                        label="Numero de Integrantes por grupo"
                        name="limiteporgrupo"
                        type="number"
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem  xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="limiteedad"
                        label="Maxima edad de Participantes"
                        name="limiteedad"
                        type="number"
                        onChange={handleChangle}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={3}>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <Button type="submit" fullWidth variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                          <Button type="submit" fullWidth variant="contained" color="primary"  >Guardar</Button>
                      </GridItem>
                  </GridContainer>
              </form>
            </div>
        </Modal>





        <Modal
          open={openModalUpdate}
          onClose={handleModalUpdate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Editar Nivel</h3>
            <form onSubmit={handleSubmitUpdate}>
                <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre del Nivel" value={consoleSeleccionada&&consoleSeleccionada.nombre} onChange={handleChangle}/>
                
                <TextField variant="outlined"  multiline={true} rows={5} margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Descripcion del nivel" value={consoleSeleccionada&&consoleSeleccionada.descripcion} onChange={handleChangle} />
                
                

                <GridContainer>
                    <GridItem  xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="limiteporgrupo"
                        label="Numero de Integrantes por grupo"
                        name="limiteporgrupo"
                        type="number"
                        value={consoleSeleccionada&&consoleSeleccionada.limiteporgrupo}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem  xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="limiteedad"
                        label="Maxima edad de Participantes"
                        name="limiteedad"
                        type="number"
                        value={consoleSeleccionada&&consoleSeleccionada.limiteedad}
                        onChange={handleChangle}
                      />
                    </GridItem>
                  </GridContainer>

                <GridContainer >
                    <GridItem xs={12} sm={12} md={1}>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <Button type="submit"  variant="contained" color="primary"  >Guardar cambios</Button>
                    </GridItem>
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
          <div style={modalStyle} className={classes.paper}>
            <h1 id="simple-modal-title"><strong>Eliminar:</strong></h1>
                <br/>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={12}>
                        En realidad desea eliminar el Nivel: <strong >{consoleSeleccionada.nombre}</strong>?
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
                        <Button type="submit" variant="contained" color="primary" onClick={Eliminar} >Eliminar</Button>
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
          <div style={modalStyle} className={classes.paper}>
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
