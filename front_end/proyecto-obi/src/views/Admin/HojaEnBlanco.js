import React,{ Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class HojaEnBlanco extends Component{
    cerrarsesion = e =>{
        cookies.remove('idusuario',{path:"/"});
        cookies.remove('username',{path:"/"});
        cookies.remove('correo',{path:"/"});
        cookies.remove('tipo',{path:"/"});
        window.location.href="../";
    }
    componentDidMount = () => {
        if(!cookies.get('username')){
            window.location.href="../";
        }
    }
    render(){
        console.log(cookies.get('idusuario'));
        console.log(cookies.get('username'));
        console.log(cookies.get('correo'));
        console.log(cookies.get('tipo'));
        return(
            <div>
                Esta Paguina esta en Blanco
            </div>
        );
    }
}
export default HojaEnBlanco;