import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import NuevoUsuario from '../pages/CrearUsuario';
function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route exact path="/menu" component={Menu}/>
      <Route exact path="/nuevousuario" component={NuevoUsuario}/>
      
    </BrowserRouter>
  );
}

export default Routes;
