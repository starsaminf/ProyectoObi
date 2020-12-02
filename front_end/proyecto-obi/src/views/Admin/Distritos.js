import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Modal, TextField, Divider} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons';
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
import CardFooter from "../../components/Card/CardFooter.js";
// @material-ui/icons
const baseUrl=HOST.Url+'Distrito.php';
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
    iddistrito:'',
    nombre:'',
    departamento:'',
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
      
      var cad= item.iddistrito+item.nombre+item.departamento; 
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
  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  setConsolaSeleccionada(consola);
  (caso==='Editar')?handleModalUpdate():handleModalDelete();
};

//******  getAll
  const getAll=async()=>{
      await axios.post(baseUrl,{_metod: 'getAll',idAdmin :cookies.get('idusuario')},header()
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
        Departamento:   consoleSeleccionada.departamento,
        idAdmin:        cookies.get('idusuario')
      },header()
    ).then(
      response => {
        
        consoleSeleccionada.mensaje = response.data.mensaje;
        handleModalMensaje();
        if(response.data.estado===1){
          //setData(response.data.admin);
          getAll();
          consoleSeleccionada.iddistrito = '';
          consoleSeleccionada.nombre = '';
          consoleSeleccionada.departamento = '';
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
      idDistrito:     consoleSeleccionada.iddistrito,
      Nombre:         consoleSeleccionada.nombre,
      Departamento:   consoleSeleccionada.departamento,
      idAdmin:        cookies.get('idusuario')
    },header()
  ).then(
    response => {
      //console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
        consoleSeleccionada.idnoticia = '';
        consoleSeleccionada.titulo = '';
        consoleSeleccionada.subtitulo = '';
        consoleSeleccionada.contenido = '';
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
        idAdmin:    cookies.get('idusuario'),
        idDistrito: consoleSeleccionada.iddistrito
    },header()
  ).then(
    response => {
      
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
        consoleSeleccionada.iddistrito = '';
        consoleSeleccionada.nombre = '';
        consoleSeleccionada.departamento = '';
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
const Aleatorio= ()=>{
  var r = Math.floor(Math.random()*5);
  if(r===0)
  return 'primary';
  if(r===1)
  return 'success';
  if(r===2)
  return 'warning';
  if(r===3)
  return 'danger';
  if(r===4)
  return 'info';
  
}

//******  se ejecuta cuando inicia el Componente
  useEffect(async()=>{
    
    getAll();
  },[]);


  return (
    <div>
      <div>
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Distritos 
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
      
      <Divider/>
      <GridContainer>
      {data2.map(console =>(
        
          <GridItem key={console.iddistrito} xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color={Aleatorio()} >
                <h3 >{console.nombre}</h3>
              </CardHeader>
              <CardFooter >
                <div>{console.departamento}</div>
                <div>
                  <Edit onClick={()=>{seleccionarConsola(console,'Editar')}} color="primary" />
                  <Delete onClick={()=>{seleccionarConsola(console,'Eliminar')}} color="secondary"/>
                </div>
                
              </CardFooter>
            </Card>
          </GridItem>
        
      ))}
      </GridContainer>
      





        <Modal
          open={openModalInsert}
          onClose={handleModalInsert}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Agregar Nuevo Distrito</h3>
            <TextField name='nombre' margin="normal"variant="outlined"  required className={classes.inputMaterial} label="nombre de distrito"onChange={handleChangle} />
            
            Departamento: 
            <select name='departamento' margin="normal"variant="outlined"className={classes.inputMaterial}  defaultValue={''} required onChange={handleChangle}>
              <option value="" disabled>Seleccionar</option>
              <option value="CH">Chuquisaca</option>
              <option value="LP">La Paz</option>
              <option value="CB">Cochabamba</option>
              <option value="OR">Oruro</option>
              <option value="PT">Potosi</option>
              <option value="TJ">Tarija</option>
              <option value="SC">Santa Cruz</option>
              <option value="BE">Beni</option>
              <option value="PD">Pando</option>
            </select>
            <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            <h3 id="simple-modal-title">Editar Distrito</h3>
            <TextField name='iddistrito' margin="normal"variant="outlined"  disabled={true} className={classes.inputMaterial} label="iddistrito"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.iddistrito}/>
            
            <TextField name='nombre'  margin="normal"variant="outlined"  required className={classes.inputMaterial} label="titulo"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.nombre}/>
            Departamento:<br/>
            <select name='departamento'margin="normal"variant="outlined" className={classes.inputMaterial}  defaultValue={consoleSeleccionada && consoleSeleccionada.departamento}  required onChange={handleChangle}>
              <option value="" disabled>Seleccionar</option>
              <option value="CH">Chuquisaca</option>
              <option value="LP">La Paz</option>
              <option value="CB">Cochabamba</option>
              <option value="OR">Oruro</option>
              <option value="PT">Potosi</option>
              <option value="TJ">Tarija</option>
              <option value="SC">Santa Cruz</option>
              <option value="BE">Beni</option>
              <option value="PD">Pando</option>
            </select>
            <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            <h3 id="simple-modal-title">Eliminar...</h3>
            <h4>En realidad desea eliminar el Distrito?</h4>
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalDelete} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={Eliminar} >Eliminar</Button>
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
