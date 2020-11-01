import React,{ Component } from "react";
import Cookies from "universal-cookie";
;
const cookies = new Cookies();
class Menu extends Component{
    cerrarsesion = e =>{
        cookies.remove('idusuario',{path:"/"});
        cookies.remove('username',{path:"/"});
        cookies.remove('correo',{path:"/"});
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
        return(
            <div>
                Menu principal
                <br/>
                <button onClick={this.cerrarsesion}>Cerrar sesion</button>
            </div>
        );
    }
}
export default Menu;