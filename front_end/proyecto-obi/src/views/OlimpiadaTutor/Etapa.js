import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
//webservise
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import EtapaDeInscripcion from '../OlimpiadaTutor/EtapaDeIncripcion';
import EtapaDeClasificacion from '../OlimpiadaTutor/EtapaDeClasificacion';
const baseUrl_Etapas      = HOST.Url+'Etapa.php';
//"../../variables/general.js";
const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function header(){
  return {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};
export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [etapa,      setEtapa]  =useState([]);
  const [value, setValue] = useState({tipo:1});
  // handleee

//******  getAll Colegio

useEffect(()=>{

  const getAllEstado=async()=>{
    //console.log("getAll Estado");
      await axios.post(baseUrl_Etapas,{
        _metod: 'getAllTutor',
        idOlimpiada: cookies.get('idolimpiada')
      },header()
    ).then(
      response => {
        if(response.data.estado===1){
          setEtapa(response.data.val);
          
          ///ini
          var search = response.data.val
        .filter(c => (
          c.es
        ).toLowerCase().includes('2'));
          ///fin
          if(search!==null){
            setValue({tipo:(search[0].tipo-1)});//con esta varaible manejamos la pocicion del que se mostrara 0 = inscripcion, 1= etapa 2
            /*if(value===1){
              console.log("Etapa de incripcion");
            }else{
              console.log("Etapa de clasificacion");
            }*/
          }
        }
      }
    ).catch(
      error=>{
        //alert(error);
        console.log(error);
      }
    )
  };
  getAllEstado();
  //getAllEstudiantes();
},[]);

  return (
    <div className={classes.root}>
      <Stepper activeStep={value.tipo} orientation="vertical">
        {etapa.map(console =>(
          
          <Step key={console.idetapa}>
            <StepLabel><strong>{console.nombre}</strong><br/><strong>Inicio:</strong>{console.fechaini}<br/><strong>Final:</strong>{console.fechafin}</StepLabel>
            
            <StepContent>
              <Typography>{console.descripcion}</Typography>
                <div className={classes.actionsContainer}>
                  {(console.tipo==='1')?<EtapaDeInscripcion idolimpiada={cookies.get('idolimpiada')} idtutor={cookies.get('idusuario')}/>:<EtapaDeClasificacion idolimpiada={cookies.get('idolimpiada')} idtutor={cookies.get('idusuario')} idetapa={console.idetapa} tipo={console.tipo}/>}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
