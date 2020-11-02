import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import NuevoUsuario from '../pages/CrearUsuario';
/*
  para el inicio tenemos que mostrar en la parte de usuario
  -iniciar sesion
  -crear cuenta
  -recuperar cuenta
*/
function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route exact path="/menu" component={Menu}/>
      <Route exact path="/crearusuario" component={NuevoUsuario}/>
    </BrowserRouter>
  );
}

export default Routes;
