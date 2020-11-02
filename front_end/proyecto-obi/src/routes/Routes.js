import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Index from '../pages/Index';
import Menu from '../pages/Menu';
import IniciarSesion from '../pages/Login';
import CrearCuenta from '../pages/CrearUsuario';
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
      <Route exact path="/iniciarsesion" component={IniciarSesion}/>
      <Route exact path="/crearcuenta" component={CrearCuenta}/>
    </BrowserRouter>
  );
}

export default Routes;
