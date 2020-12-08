import React , { useEffect, useState ,useCallback }from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";

import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardAvatar from "../components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal,  TextField} from '@material-ui/core';

import ReactMarkdown from 'react-markdown';
import avatar from "../assets/img/faces/marc.jpg";

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
import axios from 'axios';
// host variables
const baseUrl=HOST.Url_Tutor+'Tutor.php';
const baseUrl2=HOST.Url_Tutor+'Olimpiada.php';
//"../../variables/general.js";
const cookies = new Cookies();
function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }
  const header = HOST.header(cookies.get('token'));
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
  

export default function UserProfile() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [data,setData]=useState([]);
  const [mensaje,setMensaje]=useState("");
  const [openModalMensaje, setOpenMensaje] = useState(false);

  const[consoleSeleccionada,setTutor]= useState({
    celular:  0,
    ci:       0,
    correo:   "",
    nombre:   ""
  });
  
  const handleChangle = e => {
    const {name, value}= e.target;
    setTutor(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

    //**      GETBYID  */
const getbyId=useCallback(async()=>{
    await axios.post(baseUrl,{
        _metod:     'getById',
        idTutor:    cookies.get('idusuario')
    },header
  ).then(
    response => {
      console.log(response);
      if(response.data.estado===1){
        setTutor(response.data.val);
      }
    }
  ).catch(
    error=>{
      console.log(error);
    }
  )
},[]);
    //**      getAllOLimpiadas  */
    const getAllPublic=async()=>{
      await axios.post(baseUrl2,{
          _metod: 'getAllPublic'
      },header
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setData(response.data.val);
        }
      }
    ).catch(
      error=>{
        //alert(error+"");
        console.log(error);
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
        idTutor:        cookies.get('idusuario'),
        Nombre:         consoleSeleccionada.nombre,
        Correo:         consoleSeleccionada.correo,
        Ci:             consoleSeleccionada.ci,
        Celular:        consoleSeleccionada.celular
    },header
  ).then(
    response => {
      console.log(response);
      setMensaje(response.data.mensaje);
      handleModalMensaje();
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};

const seleccionarConsola =(consola)=>{
  cookies.set('idolimpiada', consola.idolimpiada, {path:"/"});
  cookies.set('fechalimiteedad', consola.fechalimiteedad, {path:"/"});
  window.location.href="../olimpiadaTutor/dashboard";
};

  const handleSubmitUpdate = event =>{
    event.preventDefault();
    Update();
  }
  useEffect(()=>{
    getbyId();
    getAllPublic();
  },[getbyId]);
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
                        <TextField inputProps={{ type: 'number'}} variant="outlined" margin="normal" fullWidth name='ci' required className={classes.carnet} label="Carnet" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.ci}/>
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
                <TableCell><strong >{console.nombre}</strong><br/><i><ReactMarkdown>{(console.descripcion.length>400)?console.descripcion.substring(0,400)+"...":console.descripcion}</ReactMarkdown></i></TableCell>
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
            <h4>{mensaje}</h4>
            <br/>
              <Button type="submit" className={classes.inputMaterial} variant="outlined" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
          </div>
        </Modal>
    </div>
  );
}