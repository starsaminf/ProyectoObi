import React , { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
// para los web servises

import axios from 'axios';
import md5 from "md5";
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";//../../variables/general.js";
const baseUrl = HOST.Url+"Tutor.php";

const cookies = new Cookies();
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
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
  paper2: {
    position: 'absolute',
    width: 600,
    height: '80%',
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
    padding: theme.spacing(0),
  },
  icons: {
    cursos:'pointer'
  },
  inputMaterial:{
    width:'10%'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
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
export default   function LoginUsuario(){
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalIniciar, setOpenIniciar] = useState(false);
  const [openModalNuevo, setOpenNuevo] = useState(false);
  const [viewAlert, setOpenAlertMensaje] = useState(false);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idtutor:'',
    nombre:'',
    appaterno:'',
    apmaterno:'',
    ci:'',
    correo:'',
    celular:'',
    password:'',
    password2:'',
    mensaje:'Mensaje'
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleModalIniciar = () => {
    handleAlertMensaje(false);
    setOpenIniciar(!openModalIniciar);
    
  };
  const handleModalNuevo = () => {
    handleAlertMensaje(false);
    setOpenNuevo(!openModalNuevo);
  };
  const handleAlertMensaje = (e) => {
    setOpenAlertMensaje(e);
  };

  const handleSubmitIniciar =async(event) =>{
    event.preventDefault();
    handleAlertMensaje(false);//juanhotmail.com
    await axios.post(baseUrl,
      {
          _metod:     'Login',
          Correo:     consoleSeleccionada.correo,
          Password:   md5(consoleSeleccionada.password)
      },
      {
          headers: {
              "Accept": "application/json, text/plain, */*",
              "Content-Type": "application/json;charset=utf-8"
          }
      }
  )
  .then(
      response => {
        //console.log(response);
          if(response.data.estado===1){
              var respuesta = response.data.val[0];
              //console.log(respuesta);
              cookies.set('idusuario', respuesta.idtutor, {path:"/"});
              cookies.set('username', respuesta.nombre, {path:"/"});
              cookies.set('correo', respuesta.correo, {path:"/"});
              cookies.set('tipo', 'tutor', {path:"/"});
              //console.log("Usuario guardadooo weee");
              window.location.href="./tutor";
          }else{
            consoleSeleccionada.mensaje=response.data.mensaje;
            handleAlertMensaje(true);
            //this.setState({alertShow:true});
          }
      }
  )
  .catch(
      error=>{
        consoleSeleccionada.mensaje=""+error;
            handleAlertMensaje(true);
        //this.setState({alertShow:true});
      }
  )
    //ejecutamos el axios
  }

  const handleSubmitCrear = async(event) =>{
    event.preventDefault();
    handleAlertMensaje(false);
    //console.log(consoleSeleccionada.correo);
    //console.log(consoleSeleccionada.password);
    //console.log(consoleSeleccionada.password2);
    //console.log("A donde muchachote");
    //ejecutamos el axios
    var alerta = false;
    var mensaje ="";
    if(!(consoleSeleccionada.password===consoleSeleccionada.password2)){
      mensaje= mensaje + "Las contraseñas no son iguales";
      alerta= true;
    }

/**
 *          * $_POST['Nombre'],
				$_POST['ApPaterno'],
				$_POST['ApMaterno'],
				$_POST['Ci'],
				$_POST['Correo'],
				$_POST['Celular'],
				$_POST['Password']
 */
    ///verificamos si es valido o no
    if(!alerta){
      //console.log("valido weeeee listo pára el axios");
      await axios.post(baseUrl,
        {
            _metod:     'Insert',
            Nombre:     consoleSeleccionada.username,
            Ci:         consoleSeleccionada.ci,
            Correo:     consoleSeleccionada.correo,
            Celular:    consoleSeleccionada.celular,
            Password:   md5(consoleSeleccionada.password)
        },
        {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json;charset=utf-8"
            }
        }
    )
    .then(
        response => {
          //console.log(response);
          consoleSeleccionada.mensaje=response.data.mensaje;
            if(response.data.estado===1){
              handleModalNuevo();
              handleModalIniciar();
              alert("la cuenta ya fue creada con exito");
              //window.location.href="./tutor";
            }else{
              //consoleSeleccionada.mensaje=response.data.mensaje;
              handleAlertMensaje(true);
              //this.setState({alertShow:true});
            }
        }
    )
    .catch(
        error=>{
          consoleSeleccionada.mensaje=""+error;
              handleAlertMensaje(true);
          //this.setState({alertShow:true});
        }
    )
      //valido
      //consoleSeleccionada.mensaje="Las contraseñas no son iguales";
      //handleAlertMensaje(true);
    }else{
      //no valido
      //console.log("No valido");
      consoleSeleccionada.mensaje=mensaje;
      handleAlertMensaje(alerta);
    }
  }

    return (
      <div >
        <form onSubmit={handleSubmitIniciar}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Correo"
                  name="correo"
                  autoComplete="correo"
                  onChange={handleChangle}
                  autoComplete="current-correo"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={handleChangle}
                  autoComplete="current-password"
                />
                <Alert show={viewAlert} variant="danger" >
                  {consoleSeleccionada.mensaje}
                </Alert>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >  Iniciar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link  variant="body2">
                      ¿Se te olvidó tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link  variant="body2" onClick={()=>{handleModalNuevo();handleModalIniciar()}}>
                      {"¿No tienes una cuenta? Regístrate"}
                    </Link>
                  </Grid>
                </Grid>
            </form>
      </div>
    );
}
