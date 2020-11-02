import React,{ Component } from "react";
import Cookies from "universal-cookie";
;
const cookies = new Cookies();
class Index extends Component{
    IniciarSesion = e =>{
        
        window.location.href="./iniciarsesion";
    }
    CrearCuenta = e =>{
        
        window.location.href="./crearcuenta";
    }
    componentDidMount = () => {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }
    render(){
        return(
            <div>
                <center>
                Acceso Publico donde se colocaran noticias e informacion<br/>
                <button onClick={this.IniciarSesion}>Iniciar sesion</button><br/>
                <button onClick={this.CrearCuenta}>Crear Cuenta</button>
                </center>
            </div>
        );
    }
}
export default Index;