import React,{ Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Tutor extends Component{
    cerrarsesion = e =>{
        cookies.remove('idusuario',{path:"/"});
        cookies.remove('username',{path:"/"});
        cookies.remove('correo',{path:"/"});
        cookies.remove('tipo',{path:"/"});
        window.location.href="./";
    }
    componentDidMount = () => {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }
    render(){
        console.log(cookies.get('idusuario'));
        console.log(cookies.get('username'));
        console.log(cookies.get('correo'));
        console.log(cookies.get('tipo'));
        return(
            <div>
                
                Menu principal de Tutor
                <br/>
                <h1>Bienvenidooooooo   { cookies.get('username')}</h1>
                <button onClick={this.cerrarsesion}>Cerrar sesion</button>
            </div>
        );
    }
}
export default Tutor;