import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from 'react-bootstrap/Alert'
import "../../assets/css/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Copyright from './Copyright';
//utiles para el webservise
import axios from 'axios';
import md5 from "md5";
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
const baseUrl = HOST.Url_Admin+"Admin.php";


const cookies = new Cookies();
class IniciarAdmin extends Component {
  state ={
    form:{
      _metod:'Login',
      UserName:'',
      Password:''
  },
    alertShow:false
  };
  handleChange = e =>{
    this.setState({
      form:{
          ...this.state.form,
          [e.target.name]:e.target.value
      }
  })

  }
  handleSubmit = event =>{
    event.preventDefault();
    this.iniciarSesion();
    //ejecutamos el axios
  }
  iniciarSesion=async()=>{
    await axios.post(baseUrl,
        {
            _metod:     'Login',
            UserName:   this.state.form.username,
            Password:   md5(this.state.form.password)
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
            if(response.data.estado===1){
                var respuesta = response.data.usuario[0];
                cookies.set('idusuario', respuesta.idadmin, {path:"/"});
                cookies.set('username', respuesta.username, {path:"/"});
                cookies.set('correo', respuesta.correo, {path:"/"});
                cookies.set('tipo', 'admin', {path:"/"});
                console.log("Usuario guardadooo weee");
                window.location.href="./Admin";
            }else
              this.setState({alertShow:true});
        }
    )
    .catch(
        error=>{
          this.setState({alertShow:true});
        }
    )
}
componentDidMount = () => {
    if(cookies.get('username')){
      if(cookies.get('tipo')==='admin'){
        window.location.href="./admin";
      }else{
        window.location.href="./tutor";
      }
    }
}
  render(){
    return(
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
              <Typography component="h1" variant="h5">
                <LockOutlinedIcon />Iniciar Sesión Admin
              </Typography>
              <form  onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  onChange={this.handleChange}
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
                  autoComplete="password"
                  onChange={this.handleChange}
                />
                <Alert show={this.state.alertShow} variant="danger" >
                  Error al iniciar Sesión
                </Alert>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                 >
                  Iniciar
                </Button>
              </form>
            </div>
          </Container>
        </div>
      </div>
    )
  }
} 

export default IniciarAdmin;