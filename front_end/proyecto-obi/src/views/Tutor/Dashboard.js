
import Cookies from "universal-cookie";
const cookies = new Cookies();
function Crear() {
  return (
    <div>Saludos tutor hdp<br/>
      usuario:  {cookies.get('idusuario')}<br/>
      Olimpiada: {cookies.get('idolimpiada')}<br/>
      tipo: {cookies.get('tipo')} <br/>
    </div>
  );
}

export default Crear;
