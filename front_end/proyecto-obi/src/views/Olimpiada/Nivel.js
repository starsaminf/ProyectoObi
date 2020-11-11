import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
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
// host components
const baseUrl=HOST.Url+'Nivel.php';
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

export default function SimpleModal() {
  //const baseUrl = HOST.Url+"Noticia.php";
  //const idAdmin='1';
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [data,setData]=useState([]);
  const [data2,setData2]=useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idnivel:'',
    nombre:'',
    descripcion:'',
    idAdmin:''
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
        _metod: 'Insert',
        Nombre:         consoleSeleccionada.nombre,
        Descripcion:   consoleSeleccionada.descripcion,
        idOlimpiada:        cookies.get('idolimpiada')
      },header()
    ).then(
      response => {
        consoleSeleccionada.mensaje = response.data.mensaje;
        handleModalMensaje();
        if(response.data.estado===1){
          //setData(response.data.admin);
          getAll();
          consoleSeleccionada.idnivel = '';
          consoleSeleccionada.nombre = '';
          consoleSeleccionada.descripcion = '';
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
      idNivel:     consoleSeleccionada.idnivel,
      Nombre:         consoleSeleccionada.nombre,
      Descripcion:   consoleSeleccionada.descripcion,
      idOlimpiada:        cookies.get('idolimpiada')
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
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
        consoleSeleccionada.idolimpiada = '';
        consoleSeleccionada.nombre = '';
        consoleSeleccionada.descripcion = '';
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
            Niveles
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
              <TableCell><strong >id</strong></TableCell>
              <TableCell><strong >Nombre / descripcion</strong></TableCell>
              <TableCell><strong >Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map(console =>(
              <TableRow key={console.idnivel}>
                <TableCell>{console.idnivel}</TableCell>
                <TableCell><strong >{console.nombre}</strong><br/><i>{console.descripcion}</i></TableCell>
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
              <h3 id="simple-modal-title">Agregar Nuevo Nivel</h3>
              <form onSubmit={handleSubmit}>
                  <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre del Nivel"  onChange={handleChangle}/>
                  
                  <TextField variant="outlined"  multiline={true} rows={5} margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Descripcion del nivel"  onChange={handleChangle} />
                  
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={3}>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                          <Button type="submit"  variant="contained" color="primary"  >Guardar</Button>
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
