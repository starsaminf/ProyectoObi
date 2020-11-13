import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
import {Edit,Delete, SupervisedUserCircle} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
// host variables
const baseUrl_participante = HOST.Url+'Participante.php';
const baseUrl_estudiante   = HOST.Url+'Estudiante.php';
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
    width: 600,
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
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert,   setOpenInsert]    = useState(false);
  const [openModalUpdate,   setOpenUpdate]    = useState(false);
  const [openModalDelete,   setOpenDelete]    = useState(false);
  const [openModalMensaje,  setOpenMensaje]   = useState(false);
  const [participante,      setParticipante]  =useState([]);
  const [participante2,     setParticipante2] =useState([]);
  const [estudiante,        setEstudiante]    =useState([]);
  const [estudiante2,        setEstudiante2]  =useState([]);
  const [estudiante3,        setEstudiante3]  =useState([
    { rude:'1', nombre:'a',ci:'9110020',participa:true },
    { rude:'2', nombre:'a',ci:'9110020',participa:false },
    { rude:'3', nombre:'a',ci:'9110020',participa:true },
    { rude:'4', nombre:'a',ci:'9110020',participa:false },
    { rude:'5', nombre:'a',ci:'9110020',participa:true },
    { rude:'6', nombre:'a',ci:'9110020',participa:false },
    { rude:'7', nombre:'a' },
    { rude:'8', nombre:'a' },
    { rude:'9', nombre:'a' },
    { rude:'11', nombre:'a' },
    { rude:'12', nombre:'a' },
    { rude:'13', nombre:'a' },
    { rude:'14', nombre:'a' },
    { rude:'15', nombre:'a' },
    { rude:'16', nombre:'a' },
    { rude:'17', nombre:'a' },
    { rude:'18', nombre:'a' },
    { rude:'19', nombre:'a' },
    { rude:'20', nombre:'a' },

  ]);
  const [colegio,           setColegio]       =useState([]);
  const [colegio2,           setColegio2]     =useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idolimpiada:'',
    nombre:'',
    descripcion:'',
    convocatoria:'',
    fechaini:'',
    fechafin:'',
    estado:''
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleChangleBuscador = e => {
    var search = participante.filter(item=>{
      //p.*, e.nombre as nom_est,c.nombre as nom_col
      var cad= item.idparticipante+item.rude+item.nom_est+item.nom_col; 
      if(cad.includes(e.target.value))
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
    const handleSubmit = event =>{
      event.preventDefault();
      //Insert();
      //ejecutamos el axios
    }
    const handleSubmitUpdate = event =>{
      event.preventDefault();
      //Update();
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

//******  getAll Participantes
  const getAllParticipantes=async()=>{
    console.log("getAll Participantes");
      await axios.post(baseUrl_participante,{
        _metod: 'getAll',
        idTutor     :cookies.get('idusuario'),
        idOlimpiada :cookies.get('idolimpiada')
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
        setParticipante2(participante);
      }
    )
  };
  //******  getAll Colegios
  const getAllColegios=async()=>{
    console.log("getAll Colegios");
      await axios.post(baseUrl_colegio,{
        _metod: 'getAllSimple'
      },header()
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setColegio(response.data.val);
          setColegio2(response.data.val);
        }
      }
    ).catch(
      error=>{
        setParticipante2(participante);
      }
    )
  };

  //******  getAll Estudiantes
  const getAllEstudiantes=async()=>{
    console.log("getAll Estudiantes");
      await axios.post(baseUrl_estudiante,{
        _metod: 'getAllSimple',
        idOlimpiada:cookies.get('idolimpiada')
      },header()
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setEstudiante(response.data.val);
          setEstudiante2(response.data.val);
        }
      }
    ).catch(
      error=>{
        setEstudiante2(participante);
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
    
    getAllParticipantes();
    getAllColegios();
    getAllEstudiantes();
  },[]);


  return (
    <div>
      <div>
      <div>Saludos tutor hdp<br/>
      usuario:  {cookies.get('idusuario')}<br/>
      Olimpiada: {cookies.get('idolimpiada')}<br/>
      tipo: {cookies.get('tipo')} <br/>
    </div>
    </div>
      <div>
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Etapa de Inscripcion
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
              <TableCell><strong >RUDE</strong></TableCell>
              <TableCell><strong >Nombre / Carnet</strong></TableCell>
              <TableCell><strong >Correo Electronico</strong></TableCell>
              <TableCell><strong >Nivel</strong></TableCell>
              <TableCell><strong >Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participante2.map(console =>(
              <TableRow key={console.idparticipante}>
                <TableCell>{console.idparticipante}</TableCell>
                <TableCell><strong >{console.nom_est}</strong><br/><i>{console.descripcion}</i></TableCell>
                <TableCell><strong >{console.nom_col}</strong><br/><i>{console.convocatoria}</i></TableCell>
                <TableCell><strong >{console.fechaini}</strong><br/><i>{console.fechafin}</i></TableCell>
                <TableCell>
                  <center>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>{seleccionarConsola(console,'Admin')}}
                    >
                      <SupervisedUserCircle/>
                  </Button><br/>
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
          <div style={modalStyle} className={classes.paper}>
              <h3 id="simple-modal-title">Agregar Estudiante</h3>
              Complete el Siguiente Formulario
              <form onSubmit={handleSubmitUpdate}>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Ap. Paterno"  onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Ap. MAterno"  onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Nombres"  onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Rude" type="number" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Carnet"  onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Correo"  type="email" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                      </GridItem>
                  </GridContainer>
                  <TextField variant="outlined"  margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Codigo SIE del Colegio" type="number" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControlLabel value="female" control={<Radio />} label="Femalesadasdasdasdasdddddddddddddddddddddddddddddddddd" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={6}>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                          <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
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
              <h3 id="simple-modal-title">Agregar Nueva Olimpiada</h3>
              <form onSubmit={handleSubmitUpdate}>
                
                  <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre del OLimpiada"  onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.nombre}/>
                  
                  <TextField variant="outlined"  multiline={true} rows={5} margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Descripcion del nivel"  onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.descripcion} />
                  
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={3}>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                          <Button type="submit"  variant="contained" color="primary"  >Guardar</Button>
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
                        En realidad desea eliminar la OLimpiada: <strong >{consoleSeleccionada.nombre}</strong>?
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
                        <Button type="submit" variant="contained" color="primary"  >Eliminar</Button>
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
