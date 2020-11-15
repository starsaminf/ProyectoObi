import React , { useEffect, useState }from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardAvatar from "../components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, TextField, Input} from '@material-ui/core';
import CardFooter from "../components/Card/CardFooter.js";
import avatar from "../assets/img/faces/marc.jpg";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
import axios from 'axios';
// host variables
const baseUrl=HOST.Url+'Tutor.php';
const baseUrl2=HOST.Url+'Olimpiada.php';
//"../../variables/general.js";
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

export default function UserProfile() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [data,setData]=useState([]);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idtutor:cookies.get('idusuario'),
    nombre:'',
    correo:'',
    celular:'',
    carnet:'',
    v:[],
    idolimpiada:''
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  function header(){
    return {
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  };
    //**      GETBYID  */
const getbyId=async()=>{
    await axios.post(baseUrl,{
        _metod: 'getById',
        idTutor:    consoleSeleccionada.idtutor
    },header()
  ).then(
    response => {
      //console.log(response);
      if(response.data.estado===1){
        const v = response.data.val;
        consoleSeleccionada.nombre =""+v.nombre;
        consoleSeleccionada.correo =""+v.correo;
        consoleSeleccionada.celular =""+v.celular;
        setConsolaSeleccionada(prevState=>({
          ...prevState,
          ['carnet']:""+v.ci
        }))

      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
    //**      getAllOLimpiadas  */
    const getAllPublic=async()=>{
      await axios.post(baseUrl2,{
          _metod: 'getAllPublic'
      },header()
    ).then(
      response => {
        //console.log(response);
        if(response.data.estado===1){
          setData(response.data.val);
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  };
//**  Cambioamos estado del modal Mensaje de abierto/cerrado */
const handleModalMensaje = () => {
    setOpenMensaje(!openModalMensaje);
  };
//**      UPDATE  */
const Update=async()=>{
    consoleSeleccionada.mensaje='';
    await axios.post(baseUrl,{
        _metod:         'Update',
        idTutor:        consoleSeleccionada.idtutor,
        Nombre:         consoleSeleccionada.nombre,
        Correo:         consoleSeleccionada.correo,
        Ci:             consoleSeleccionada.carnet,
        Celular:        consoleSeleccionada.celular
    },header()
  ).then(
    response => {
        //console.log(response);
      setConsolaSeleccionada(prevState=>({
        ...prevState,
        ['mensaje']:response.data.mensaje
      }))
      handleModalMensaje();
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
//** Seleccionamos consola */
const seleccionarConsola =(consola)=>{
  //console.log(consola.idolimpiada)
  //en esta parte abrimos el admin de tutor con el id =console.logidOLimpiada
  cookies.set('idolimpiada', consola.idolimpiada, {path:"/"});
  window.location.href="../olimpiadaTutor/dashboard";
};
//POr defecto al entrar
  const handleSubmitUpdate = event =>{
    event.preventDefault();
    //console.log("Editamos");
    Update();
    //ejecutamos el axios
  }
  useEffect(async()=>{
    
    getbyId();
    getAllPublic();
  },[]);
  const salir =()=>{
    cookies.remove('idusuario',{path:"/"});
    cookies.remove('username',{path:"/"});
    cookies.remove('correo',{path:"/"});
    cookies.remove('tipo',{path:"/"});
    cookies.remove('idolimpiada',{path:"/"});
    
    window.location.href="../";
  }
  return (
    <div>
        <div className={classes.content}>
            <div className={classes.container}>

            <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Tutor / Tutora</h6>
                <h4 className={classes.cardTitle}>Perfil</h4>
              <div className={classes.description}>
                <form onSubmit={handleSubmitUpdate}>
                  <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre y Apellidos" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.nombre} />
                  <TextField type="email" disabled={true} variant="outlined" margin="normal" fullWidth name='correo' required className={classes.correo} label="Correo" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.correo}/>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField inputProps={{ type: 'number'}} variant="outlined" margin="normal" fullWidth name='celular' required className={classes.celular} label="Celular" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.celular}/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField inputProps={{ type: 'number'}} variant="outlined" margin="normal" fullWidth name='carnet' required className={classes.carnet} label="Carnet" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.carnet}/>
                      </GridItem>
                  </GridContainer>
                    <Button type="submit"  color="primary" round>
                        Guardar Cambios
                    </Button>
                    <Button   color="danger" round onClick={salir}>
                        cerrar sesion
                    </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Olimpiada Boliviana de Informatica</h4>
              <p className={classes.cardCategoryWhite}>Seleccione una Version</p>
            </CardHeader>
            <CardBody>
            <TableContainer className={classes.content}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell><strong >id</strong></TableCell>
              <TableCell><strong >nombre/ descripcion</strong></TableCell>
              <TableCell><strong ><center>Fechas</center></strong></TableCell>
              <TableCell><strong ><center>Acciones</center></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(console =>(
              <TableRow key={console.idolimpiada}>
                <TableCell>{console.idolimpiada}</TableCell>
                <TableCell><strong >{console.nombre}</strong><br/><i>{console.descripcion}</i></TableCell>
                <TableCell><strong >Inicio:</strong>{console.fechaini}<br/><strong>final:</strong>{console.fechafin}</TableCell>
                <TableCell><center>
                  {(console.estado === "En Curso")?
                    <Button color= "primary"onClick={()=>{seleccionarConsola(console)}}> Iniciar</Button>
                    : console.estado
                  }
                  </center>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            
              
            </CardBody>
            
          </Card>
        </GridItem>
      </GridContainer>


            </div>
          </div>
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