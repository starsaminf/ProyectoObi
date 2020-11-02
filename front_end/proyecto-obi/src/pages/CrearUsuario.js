import React,{ Component } from "react";
import Cookies from "universal-cookie";
import SignIn from "./Component/SignIn";
const cookies = new Cookies();
class CrearUsuario extends Component{

    componentDidMount = () => {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }
    render(){
        return(
            <div>
                Crear Usuario
                <br/>
                <h1>Bienvenidooooooo en desarrollo</h1>
                <SignIn />
                <br/>
                
                
            </div>
        );
    }
}
export default CrearUsuario;