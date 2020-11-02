import React,{ Component } from "react";
import  "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import md5 from "md5";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:4000/proyectoOBI/back_end/Usuario.php";
const cookies = new Cookies();
class Login extends Component{
    state ={
        mensaje:'',
        form:{
            _metod:'Login',
            UserName:'',
            Password:''
        }
    }
    handleChange = e =>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }
    iniciarSesion=async()=>{
        this.setState({mensaje:''});
        await axios.post(baseUrl,
            {
                _metod:     this.state.form._metod,
                UserName:   this.state.form.UserName,
                Password:   md5(this.state.form.Password)
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
                console.log(md5(this.state.form.Password));
                console.log(response);
                if(response.data.estado===1){
                    var respuesta = response.data.usuario[0];
                    console.log(response.data.usuario.idusuario);
                    cookies.set('idusuario', respuesta.idusuario, {path:"/"});
                    cookies.set('username', respuesta.username, {path:"/"});
                    cookies.set('correo', respuesta.correo, {path:"/"});
                    window.location.href="./menu";
                }else
                    this.setState({mensaje:response.data.mensaje});
            }
        )
        .catch(
            error=>{
                this.setState({contraseña:''});
                console.log(error);
            }
        )
    }
    componentDidMount = () => {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }

    render(){
        return(
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h3>Iniciar Sesion</h3> 
                </div>
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input name="UserName" type="text" className="form-control"  onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input name="Password" type="password" className="form-control" onChange={this.handleChange} />
                    </div>
                    {this.state.mensaje}
                    
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.iniciarSesion}>Sign Up</button>
                    <p className="forgot-password text-right">
                        crear cuenta <a href="./crearusuario">nueva</a><br />
                    </p>
            </div>
            
        );
    }
}
export default Login;