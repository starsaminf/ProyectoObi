import {BrowserRouter, Route} from 'react-router-dom';
import Index from '../views/Public.js';
import Menu from '../pages/Menu';
import IniciarSesion from '../pages/Login';
import CrearCuenta from '../pages/CrearUsuario';
import Prueba from '../pages/Prueba3';
/*
  para el inicio tenemos que mostrar en la parte de usuario
  -iniciar sesion
  -crear cuenta
  -recuperar cuenta
*/
function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Index}/>
      <Route exact path="/menu" component={Menu}/>
      <Route exact path="/prueba" component={Prueba}/>
      <Route exact path="/iniciarsesion" component={IniciarSesion}/>
      <Route exact path="/crearcuenta" component={CrearCuenta}/>
    </BrowserRouter>
  );
}

export default Routes;
