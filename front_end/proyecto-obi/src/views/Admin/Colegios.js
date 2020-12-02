import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
const baseUrl=HOST.Url+'Colegio.php';
const baseUrlDist=HOST.Url+'Distrito.php';
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
  const idAdmin='1';
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [data,setData]=useState([]);
  const [data2,setData2]=useState([]);
  const [data3,setData3]=useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idcolegio:'',
    iddistrito:'',
    nombre:'',
    sie:'',
    zona:'',
    direccion:'',
    latitud:'0',
    longitud:'0'
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleChangleBuscador = e => {
    var search = data.filter(item=>{
      var cad= item.nombre+item.sie+item.nn+item.nd; 
      if(cad.includes(e.target.value))
        return item;
    });
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

    //******  getAll colegios
  const getAll=async()=>{
      await axios.post(baseUrl,{_metod: 'getAll',idAdmin :'1'},header()
    ).then(
      response => {
        if(response.data.estado===1){
          setData(response.data.val);
          setData2(response.data.val);
        }
      }
    ).catch(
      error=>{
        setData2(data);
      }
    )
  };
  //***** get ALl Distritos */
  const getAllDistritos=async()=>{
    await axios.post(baseUrlDist,{_metod: 'getAll',idAdmin :'1'},header()
  ).then(
    response => {

      if(response.data.estado===1){
        setData3(response.data.val);
      }
    }
  ).catch(
    error=>{
        console.log(error);
    }
  )
};
  const Insert=async()=>{
    handleModalInsert();
    
      await axios.post(baseUrl,{
        _metod:     'Insert',
        Sie:        consoleSeleccionada.sie,
        Nombre:     consoleSeleccionada.nombre,
        Zona:       consoleSeleccionada.zona,
        Direccion:  consoleSeleccionada.direccion,
        Latitud:    consoleSeleccionada.latitud,
        Longitud:   consoleSeleccionada.longitud,
        idDistrito:  consoleSeleccionada.iddistrito
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
//**      UPDATE  */
const Update=async()=>{
  handleModalUpdate();
  
    await axios.post(baseUrl,{
      _metod: 'Update',
      Sie:          consoleSeleccionada.sie,
      Nombre:       consoleSeleccionada.nombre,
      Zona:         consoleSeleccionada.zona,
      Direccion:    consoleSeleccionada.direccion,
      idDistrito:   consoleSeleccionada.iddistrito
    },header()
  ).then(
    response => {
      console.log(response);
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
        idNoticia: consoleSeleccionada.idnoticia
    },header()
  ).then(
    response => {
      console.log(response);
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

//******  se ejecuta cuando inicia el Componente
  useEffect(async()=>{
    
    getAll();
    getAllDistritos();
  },[]);


  return (
    <div>
      <div>
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Colegios
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
              <TableCell><strong >Sie</strong></TableCell>
              <TableCell><strong >nombre / direccion</strong></TableCell>
              <TableCell><strong >Distrito</strong></TableCell>
              <TableCell><strong >Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map(console =>(
              <TableRow key={console.sie}>
                <TableCell>{console.sie}</TableCell>
                <TableCell><strong >{console.nombre}</strong><br/><i>{console.zona}</i></TableCell>
                <TableCell><strong >{console.nd}</strong><br/><i>{console.dd}</i></TableCell>
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
              <h3 id="simple-modal-title">Agregar Nuevo Colegio</h3>
              <form  onSubmit={Insert}>
                <TextField name='nombre'margin="normal"variant="outlined" required className={classes.inputMaterial} label="nombre"onChange={handleChangle} />
                <br/>
                <TextField name='sie'margin="normal"variant="outlined" required className={classes.inputMaterial} label="sie" onChange={handleChangle} />
                <br/>
                <TextField name='zona'margin="normal" variant="outlined"required className={classes.inputMaterial} label="zona" onChange={handleChangle} />
                <br/>
                <TextField name='direccion'margin="normal" variant="outlined" className={classes.inputMaterial} label="direccion" onChange={handleChangle} />
                <br/>
                
                
                <br/>
                <br/>
                Seleccione un distrito&nbsp;&nbsp;
                <select name='iddistrito' required onChange={handleChangle}>
                  {data3.map(console =>(
                    <option value={console.iddistrito} key={console.iddistrito}>{console.nombre+'('+console.departamento+')'}</option>
                  ))}
                </select>
            
                
                
                
                <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
                  &nbsp;
                  <Button type="submit" variant="contained" color="primary"  >Guardar</Button>
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
            <h3 id="simple-modal-title">Editar colegio</h3>
            <form  onSubmit={Update}>
                <TextField name='sie'margin="normal"variant="outlined" disabled={true} className={classes.inputMaterial} label="Sie"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.sie}/>
                <br/>
                <TextField name='nombre'margin="normal"variant="outlined" required className={classes.inputMaterial} label="nombre"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.nombre}/>
                <br/>
                <TextField name='zona'margin="normal" variant="outlined"required className={classes.inputMaterial} label="zona" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.zona}/>
                <br/>
                <TextField name='direccion'margin="normal"variant="outlined"  className={classes.inputMaterial} label="direccion" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.direccion}/>
                <br/>
                
                <br/>
                <br/>
                Seleccione un distrito&nbsp;&nbsp;
                <select name='iddistrito' required onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.iddistrito}>
                  {data3.map(console =>(
                    <option value={console.iddistrito} key={console.iddistrito}>{console.nombre+'('+console.departamento+')'}</option>
                  ))}
                </select>
                
                <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
                &nbsp;
                <Button type="submit" variant="contained" color="primary"  >Guardar Cambios</Button>
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
            <h3 id="simple-modal-title">Eliminar...</h3>
            <h4>En realidad desea eliminar el Colegio?</h4>
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
