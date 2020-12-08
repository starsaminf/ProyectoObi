import React, { useEffect, useState,useCallback } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TextField} from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

// core components
import ListaDeIntegrantes from './components/ListaDeIntegrantes.js';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import Grafico from './components/Grafico.js';
// host variables
const baseUrl_Grupo      = HOST.Url_Tutor+'Grupo.php';
//"../../variables/general.js";
const cookies = new Cookies();
//************************** */



function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper3: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper4: {
    position: 'absolute',
    width: 500,
    border: '0px solid #000',
    boxShadow: theme.shadows[0],
    padding: theme.spacing(1, 1, 1),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icons: {
    cursos:'pointer'
  },
  inputMaterial:{
    width:'100%'
  },
  button:{
    margin: theme.spacing(0.1),
  },
  gridList: {
    width: '100%',
    height: 200,
  },
  
}));
const header = HOST.header(cookies.get('token'));

export default function IncribirParticipanteIndividual(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [openModalEstadistica,   setOpenEstadistica]    = useState(false);

  const [grupos,  setGrupos]   = useState([]);
  const [grupos2,  setGrupos2]   = useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idGrupo:'',
    nombre:'',
    mensaje:'',
    sie:'',
    colegio:'Indefinido',
    colegiovalido:false

  });

  const handleChangleBuscador = e => {
    /****************** */
    if(e.target.value==='')
    setGrupos2(grupos);
    else{
      var val=e.target.value.toLowerCase();
      var relevantCompanyMeasures = grupos
      .filter(c => (
        c.nombre+
        c.nombre_col
      ).toLowerCase().includes(val));
      setGrupos2(relevantCompanyMeasures);
    }
  }

  const handleModalEstadistica = () => {
    setOpenEstadistica(!openModalEstadistica);
  };
    //*** detenemos submit de formulario */

  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  console.log("ESTADISTICA");
  setConsolaSeleccionada(consola);
    if(caso==='Estadistica'){
      handleModalEstadistica();
    }
};

//******  getAll Colegio

//***   GET ALL GRUPO */

const getAllGrupo=useCallback(async()=>{
  //console.log("getAll estudiantes por tutor y olimpiada");
    await axios.post(baseUrl_Grupo,{
      _metod:       'getAll',
      idOlimpiada:  cookies.get('idolimpiada'),
      idNivel:      props.idnivel,
      idTutor:      cookies.get('idusuario'),
    },header
  ).then(
    response => {
      //console.log("VALLLLLLSSDKJBKJJH");
      //console.log(response);
      if(response.data.estado===1){
        setGrupos(response.data.val);
        setGrupos2(response.data.val);
      }else{
        setGrupos([]);
        setGrupos2([]);
      }
    }
  ).catch(
    error=>{
      //alert(error);
      console.log(error);
    }
  )
},[props]);

//******  se ejecuta cuando inicia el Componente
  useEffect(()=>{
    getAllGrupo();
  },[getAllGrupo]);


  return (
    <div>
      <div>
        En este Nivel solo se permite <strong>{props.limiteporgrupo}</strong>  integrantes por Grupo, con edad menor o igual a <strong> {props.limiteporedad}</strong>  años hasta <strong>  {props.fechaMax}</strong> <br/>
        
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Grupos
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            id="buscar"
            label="buscar"
            name="buscar"
            onChange={handleChangleBuscador}
          />
          
        </Toolbar>        
      </div>  
      
      <TableContainer className={classes.content}>
      {(grupos2.length===0&&grupos)?<Alert  severity="error">No se agrego Grupos a este nivel!</Alert>:
                
              
        <Table>
          <TableHead >
         
            <TableRow >
              <TableCell><strong >codigo</strong></TableCell>
              <TableCell><strong >Nombre de Grupo</strong></TableCell>
              <TableCell><strong >Colegio/Sie</strong></TableCell>
              <TableCell><strong ><center>Integrante</center></strong></TableCell>
              <TableCell><strong ><center>Reporte</center></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {grupos2.map(console =>(
              <TableRow key={console.idgrupo}>
                <TableCell><center>{console.idgrupo}</center></TableCell>
                <TableCell>{console.nombre}</TableCell>
                <TableCell>{console.nombre_col}<br/><strong>Sie: </strong>{console.sie}</TableCell>
                <TableCell><ListaDeIntegrantes idGrupo={console.idgrupo} limiteporgrupo={props.limiteporgrupo} limiteporedad={props.limiteporedad}/></TableCell>
                <TableCell><Button color="primary"  variant="contained" onClick={()=>{seleccionarConsola(console,'Estadistica')}}><TimelineSharpIcon/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        }
      </TableContainer>



      <Modal
          open={openModalEstadistica}
          onClose={handleModalEstadistica}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper4}>
            <Grafico idGrupo={consoleSeleccionada.idgrupo}/>
          </div>
          
        </Modal>
    </div>
  );
}
