import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
import {Edit,Delete, SupervisedUserCircle} from '@material-ui/icons';
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
// host variables
const baseUrl_participante = HOST.Url+'Participante.php';
const baseUrl_estudiante   = HOST.Url+'Estudiante.php';
const baseUrl_nivel   = HOST.Url+'Nivel.php';
const baseUrl_distrito     = HOST.Url+'Distrito.php';
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

export default function SimpleModal() {
  //const baseUrl = HOST.Url+"Noticia.php";
  //const idAdmin='1';
  const classes = useStyles();
  const [value, setValue] = useState('femenino');

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert,   setOpenInsert]    = useState(false);
  const [openModalUpdate,   setOpenUpdate]    = useState(false);
  const [openModalDelete,   setOpenDelete]    = useState(false);
  const [openModalMensaje,  setOpenMensaje]   = useState(false);
  const [participante,      setParticipante]  =useState([]);
  const [participante2,     setParticipante2] =useState([]);
  const [colegios,      setColegio]  =useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    appaterno:'',
    apmaterno:'',
    nombre:'',
    rude:'',
    carnet:'',
    celular:'',
    correo:'',
    fechaNac:'',
    genero:'',
    sie:'',
    colegio:'',
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
  const buscarColegio = e => {
    var search = colegios.filter(item=>{
      //p.*, e.nombre as nom_est,c.nombre as nom_col
      var cad= item.sie; 
      if(cad===e.target.value){
        return item.nombre;
      }
    });
    var estado="no existe el colegio";
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
  const handleChangleBuscador = e => {
    e=(e.target.value).toLowerCase();
    var search = participante.filter(item=>{
      var cad= (item.rude+item.ci+item.nombre+item.appaterno+item.apmaterno+item.sie+item.correo+item.celular+buscarNombreDECol(item.sie)).toString().toLowerCase(); 
      if(cad.includes(e))
        return item;
    });
    setParticipante2(search);
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
    const handleSubmitInsert = event =>{
      event.preventDefault();
      //Insert();
      //ejecutamos el axios
    }
    const handleSubmitUpdate = event =>{
      event.preventDefault();
      UpdateEstudiante();
      //ejecutamos el axios
    }
  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  setConsolaSeleccionada(consola);
    if(caso==='Editar'){
      handleModalUpdate();
    }else{
        if(caso==='Admin'){
          cookies.set('idolimpiada', consola.idolimpiada, {path:"/"});
          window.location.href="../olimpiadaAdmin/dashboard";
        }else{
            handleModalDelete();
        }
    }
};
const AlistarParticipante = event => {
  event.preventDefault();//cancelamos los eventos 
  if(consoleSeleccionada.colegiovalido){
    console.log("Colegio vALIDO");
    getVerificar();
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

//******  getAll Colegio
const getAllColegios=async()=>{
  console.log("getAll Colegio");
    await axios.post(baseUrl_colegio,{
      _metod: 'getAllSimple'
    },header()
  ).then(
    response => {
      console.log(response);
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
const getAll_Por_Tutor_y_Olimpiada=async()=>{
  console.log("getAll estudiantes por tutor y olimpiada");
    await axios.post(baseUrl_estudiante,{
      _metod:       'getAll_Por_Tutor_y_Olimpiada',
      idOlimpiada:  cookies.get('idolimpiada'),
      idTutor:      cookies.get('idusuario')
    },header()
  ).then(
    response => {
      console.log(response);
      if(response.data.estado===1){
        setParticipante(response.data.val);
        setParticipante2(response.data.val);
      }
    }
  ).catch(
    error=>{
      alert(error);
    }
  )
};
/*
				$_POST['idTutor'],
				$_POST['idColegio'],
				$_POST['idOlimpiada'],
				$_POST['Rude'],
				$_POST['Nombre'],
				$_POST['ApPaterno'],
				$_POST['ApMaterno'],
				$_POST['Celular'],
				$_POST['FechaNac'],
				$_POST['Genero'],
				$_POST['Ci'],
				$_POST['Correo']
*/
const InsertEstudiante=async()=>{
  
  handleModalInsert();
  console.log("Colegio = "+consoleSeleccionada.idcolegio);
    await axios.post(baseUrl_estudiante,{
      _metod: 'Insert',      
      idTutor:        cookies.get('idusuario'),
      Sie:            consoleSeleccionada.sie,
      idOlimpiada:    cookies.get('idolimpiada'),
      Rude:           consoleSeleccionada.rude,
      Nombre:         consoleSeleccionada.nombre,
      ApPaterno:      consoleSeleccionada.appaterno,
      ApMaterno:      consoleSeleccionada.apmaterno,
      Celular:        consoleSeleccionada.celular,
      FechaNac:       consoleSeleccionada.fechanac,
      Genero:         value,
      Ci:             consoleSeleccionada.ci,
      Correo:         consoleSeleccionada.correo,
    },header()
  ).then(
    response => {
      console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        getAll_Por_Tutor_y_Olimpiada();
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
const UpdateEstudiante=async()=>{
  
  handleModalUpdate(consoleSeleccionada.idestudiante);
    console.log();
    await axios.post(baseUrl_estudiante,{
      _metod: 'Update',  
      idEstudiante:   consoleSeleccionada.idestudiante,    
      idTutor:        cookies.get('idusuario'),
      Sie:            consoleSeleccionada.sie,
      idOlimpiada:    cookies.get('idolimpiada'),
      Rude:           consoleSeleccionada.rude,
      Nombre:         consoleSeleccionada.nombre,
      ApPaterno:      consoleSeleccionada.appaterno,
      ApMaterno:      consoleSeleccionada.apmaterno,
      Celular:        consoleSeleccionada.celular,
      FechaNac:       consoleSeleccionada.fechanac,
      Genero:         value,
      Ci:             consoleSeleccionada.ci,
      Correo:         consoleSeleccionada.correo,
    },header()
  ).then(
    response => {
      console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        getAll_Por_Tutor_y_Olimpiada();
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
const getVerificar=async()=>{
  //handleModalInsert();
    await axios.post(baseUrl_estudiante,{
      _metod: 'getVerificar',      
      idOlimpiada:        cookies.get('idolimpiada'),
      idTutor:            cookies.get('idusuario'),
      Rude:               consoleSeleccionada.rude
    },header()
  ).then(
    response => {
      console.log(response);
      if(response.data.estado===2){
        //en este caso el estudinate esta habilitado para ser agregado
        console.log("Agregamos al Estudiante");
        InsertEstudiante();
      }else{
        consoleSeleccionada.mensaje = "El estudiante ya esta registrado con otro Tutor";
        handleModalMensaje();
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
const buscarNombreDECol= (e)=>{
  var search = colegios.filter(item=>{
    //p.*, e.nombre as nom_est,c.nombre as nom_col 
    if(item.sie===e){
      return item.nombre;
    }
  });

  if(search.length===1){
    return search[0].nombre;
  }
  return "Indefinido";
}
const Eliminar=async()=>{
  handleModalDelete();
  
    await axios.post(baseUrl_estudiante,{
      _metod: 'Delete',
        idEstudiante: consoleSeleccionada.idestudiante
    },header()
  ).then(
    response => {
      console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll_Por_Tutor_y_Olimpiada();
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
  //*****   Insert */
  /*const Insert=async()=>{
    handleModalInsert();
      await axios.post(baseUrl,{
        _metod: 'Insert',
        Nombre:         consoleSeleccionada.nombre,
        Descripcion:    consoleSeleccionada.descripcion,       
        idAdmin:        cookies.get('idusuario')
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
//     UPDATE  /
const Update=async()=>{
  handleModalUpdate();
    await axios.post(baseUrl,{
        _metod: 'UpdateSimple',
        idOlimpiada:    consoleSeleccionada.idolimpiada,
        Nombre:         consoleSeleccionada.nombre,
        Descripcion:    consoleSeleccionada.descripcion,      
        idAdmin:        cookies.get('idusuario')
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
// eliminar
const Eliminar=async()=>{
  handleModalDelete();
  
    await axios.post(baseUrl,{
      _metod: 'Delete',
        idAdmin:    cookies.get('idusuario'),
        idOlimpiada: consoleSeleccionada.idolimpiada
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
};*/

//******  se ejecuta cuando inicia el Componente
  useEffect(async()=>{
    getAllColegios();
    getAll_Por_Tutor_y_Olimpiada();
    //getAllEstudiantes();
  },[]);


  return (
    <div>
      <div>
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Mis Estudiantes
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
              <TableCell><strong >RUDE/Ci</strong></TableCell>
              <TableCell><strong >Nombre</strong></TableCell>
              <TableCell><strong >Email/celular</strong></TableCell>
              <TableCell><strong ><center>Colegio</center></strong></TableCell>
              <TableCell><center><strong >Acciones</strong></center></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participante2.map(console =>(
              <TableRow key={console.idestudiante}>
                <TableCell><strong >Rude: </strong>{console.rude}<br/><strong >Ci: </strong>{console.ci}</TableCell>
                <TableCell>{console.nombre}<br/><i>{console.appaterno}</i><br/><i>{console.apmaterno}</i></TableCell>
                <TableCell>{console.correo}<br/><i>{console.celular}</i></TableCell>
            <TableCell><strong >Nombre: </strong><i>{buscarNombreDECol(console.sie)}<br/><strong >Sie: </strong>{console.sie}</i></TableCell>
                <TableCell>
                  <center>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={()=>{seleccionarConsola(console,'Editar')}}
                    >
                      <Edit/>
                  </Button>
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
          <div style={modalStyle} className={classes.paper}>
              <h3 id="simple-modal-title">Seleccionar mis Estudiantes</h3>
              <div >
              <form  onSubmit={AlistarParticipante}>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='appaterno' required label="Ap. Paterno"  onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='apmaterno' required label="Ap. MAterno"  onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='nombre' required label="Nombres"  onChange={handleChangle} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='rude' required label="Rude" type="number" onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='ci' required label="Carnet"  onChange={handleChangle}  />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='correo' required label="Correo"  type="email" onChange={handleChangle}/>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='celular' required label="Celular"  onChange={handleChangle}  />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                        Colegio:{consoleSeleccionada.colegio}
                        <TextField variant="outlined" margin="normal"   fullWidth name='sie' required  label="Codigo SIE del Colegio" type="number" onChange={buscarColegio }  />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={3}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='fechanac' required label="fechaNac"  type="date" InputLabelProps={{shrink:true}} onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={3}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">genero</FormLabel>
                          <RadioGroup aria-label="gender" name="genero" value={value} onChange={handleChangeRadio}>
                            <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                          </RadioGroup>
                        </FormControl>
                      </GridItem>
                  </GridContainer>
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
          <div style={modalStyle} className={classes.paper}>
              <h3 id="simple-modal-title">Editar datos de Estudiante</h3>
              <form  onSubmit={handleSubmitUpdate}>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='appaterno' required label="Ap. Paterno"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.appaterno} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='apmaterno' required label="Ap. MAterno"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.apmaterno} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='nombre' required label="Nombres"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.nombre}/>
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='rude' required label="Rude" type="number" onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.rude}disabled />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='ci' required label="Carnet"  onChange={handleChangle}  value={consoleSeleccionada&&consoleSeleccionada.ci}/>
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='correo' required label="Correo"  type="email" onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.correo}/>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='celular' required label="Celular"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.celular} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                        Colegio:{buscarNombreDECol(consoleSeleccionada.sie)}
                        <TextField variant="outlined" margin="normal"   fullWidth name='sie' required  label="Codigo SIE del Colegio" type="number" onChange={buscarColegio }  value={consoleSeleccionada&&consoleSeleccionada.sie}disabled/>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={3}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='fechanac' required label="fechaNac"  type="date" InputLabelProps={{shrink:true}} onChange={handleChangle}  value={consoleSeleccionada&&consoleSeleccionada.fechanac}/>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={3}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">genero</FormLabel>
                          <RadioGroup aria-label="gender" name="genero"  onChange={handleChangeRadio}value={consoleSeleccionada&&consoleSeleccionada.genero}>
                            <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                          </RadioGroup>
                        </FormControl>
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
                        En realidad desea eliminar al Estudiante: <br/>
                        <strong >Rude:       </strong>{consoleSeleccionada.rude}<br/>
                        <strong >nombre:     </strong>{consoleSeleccionada.nombre} {consoleSeleccionada.appaterno} {consoleSeleccionada.apmaterno}<br/>
                        <strong >Carnet:     </strong>{consoleSeleccionada.ci}<br/>
                        <strong >Colegio:    </strong>{buscarNombreDECol(consoleSeleccionada.sie)}<br/>
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
