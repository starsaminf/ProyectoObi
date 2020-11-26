
import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
//** WEB SERVISES */
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Table,  TableCell, TableBody, TableRow,TextField,  Modal} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Radio from '@material-ui/core/Radio';
import { Divider } from '@material-ui/core';

//**  EXPANDIBLE */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';

//radiooooo

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
const baseUrl_grupo   = HOST.Url+'Grupo.php';
const baseUrl_estudiante   = HOST.Url+'Estudiante.php';
const baseUrl_Integrante_de   = HOST.Url+'Integrante_de.php';
const cookies = new Cookies();
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
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    paper2: {
      position: 'absolute',
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2, 4, 0),
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    icons: {
      cursos:'pointer'
    },
    inputMaterial:{
      width:'100%',
      backgroundColor: "#4CAF50",
      color: "#ffffff",
      textAlign: 'center',
      border: 'none',
    },
    button:{
      margin: theme.spacing(0.1),
    },
    gridList: {
      width: '100%',
      height: 200,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
  
function GestionDeIntegrante(props) {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [openModalInsertRude,   setOpenInsertRude]    = useState(false);
    const [openModalInsert,   setOpenInsert]    = useState(false);
    const [openModalUpdate,   setOpenUpdate]    = useState(false);
    const [openModalDelete,   setOpenDelete]    = useState(false);
    const [openModalMensaje,  setOpenMensaje]   = useState(false);
    const [openAcordeon,  setOpenAcordeon]   = useState(true);
    const [data,  setData]   = useState([]);
    const [mensaje,  setMensaje]   = useState([]);
    const [consoleSeleccionada, setConsolaSeleccionada]= useState({
        idestudiante:'',
        appaterno:'',
        apmaterno:'',
        nombre:'',
        rude:'',
        carnet:'',
        celular:'',
        correo:'',
        fechanac:'',
        genero:'',
        sie:'',
        ci:'',
        colegio:'',
        colegiovalido:false,
        mensaje:'',
        m:0
      })

      const [value, setValue] = useState('femenino');

      const handleChangeRadio = (event) => {
        setValue(event.target.value);
      };
      const handleChangle = e => {
        const {name, value}= e.target;
        setConsolaSeleccionada(prevState=>({
          ...prevState,
          [name]:value
        }))
      }
      const handleModalInsertRude = () => {
        setOpenInsertRude(!openModalInsertRude);
      };
      const handleModalInsert = () => {
        setOpenInsert(!openModalInsert);
      };
      const handleModalUpdate = () => {
        setOpenUpdate(!openModalUpdate);
      };
      const handleModalDelete = () => {
        setOpenDelete(!openModalDelete);
      };
      const handleModalMensaje = () => {
        setOpenMensaje(!openModalMensaje);
      };
      const handleAcordeon = () => {
        setOpenAcordeon(!openAcordeon);
      };
        //*** detenemos submit de formulario */
    
      //*** seleccionar consola */
    const seleccionarConsola =(consola,caso)=>{
      console.log("Sleccionamos consola");
      consoleSeleccionada.rude=consola.rude;
        if(caso==='Borrar'){
          BorrarParticipacion();
        }else{
          InsertarParticipacion();
        }
    };

//***   GET ALL Estudiants inscritos en cada grupo  */
const getAllEstudiantesDeGrupo=async()=>{
      await axios.post(baseUrl_grupo,{
        _metod:         'getAllEstudiantesDeGrupo',
        idGrupo:        props.idGrupo
      },header()
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setData(response.data.val);
          //setConsolaSeleccionada(response.data.val);
          
        }else{
          setData([]);
        }
      }
    ).catch(
      error=>{
        alert(error);
      }
    )
  };
  
//***   GET ALL Estudiantes de cada tutor en la olimpiada  */
const getAllEstudiantesPorTutor=async()=>{
    await axios.post(baseUrl_estudiante,{
      _metod:           'getAllEstudiantesDeTutor',
      idTutor:          cookies.get('idusuario'),
      idOlimpiada:      cookies.get('idolimpiada')
    },header()
  ).then(
    response => {
      console.log("estudiantessss")
      console.log(response);
      /*if(response.data.estado===1){
        setEstudiantes(response.data.val);
      }else{
        setEstudiantes([]);
      }*/
    }
  ).catch(
    error=>{
      alert(error);
    }
  )
};
//**Borrar Integrante */
const BorrarParticipacion=async()=>{
  console.log("Borrar PArticipacion");
  console.log(consoleSeleccionada);
  await axios.post(baseUrl_Integrante_de,{
    _metod:           'Delete',
    Rude:             consoleSeleccionada.rude,
    idGrupo:          props.idGrupo
  },header()
).then(
  response => {
    console.log(response);
    if(response.data.estado===1){
      getAllEstudiantesDeGrupo();
      //setData(response.data.val);
    }else{
      //setData([]);
    }
  }
).catch(
  error=>{
    alert(error);
  }
)
};
//**Insert  Integrante */
const InsertarParticipacion=async()=>{
  //handleModalInsert();
  console.log(consoleSeleccionada);
  await axios.post(baseUrl_Integrante_de,{
    _metod:           'Insert',
    Rude:             consoleSeleccionada.rude,
    idGrupo:          props.idGrupo
  },header()
).then(
  response => {
    console.log(response);
    if(response.data.estado===1){
      getAllEstudiantesDeGrupo();
      //setData(response.data.val);
    }else{
    }
  }
).catch(
  error=>{
    alert(error);
  }
)
};
//**Insert  Integrante */
const InsertEstudiante=async(event)=>{
  event.preventDefault();
  handleModalInsert();
    //console.log();
    await axios.post(baseUrl_estudiante,{
      _metod: 'Insert',  
      Rude:           consoleSeleccionada.rude,
      Nombre:         consoleSeleccionada.nombre,
      ApPaterno:      consoleSeleccionada.appaterno,
      ApMaterno:      consoleSeleccionada.apmaterno,
      Celular:        consoleSeleccionada.celular,
      FechaNac:       consoleSeleccionada.fechanac,
      Genero:         value,
      Ci:             consoleSeleccionada.ci,
      Correo:         consoleSeleccionada.correo
    },header()
  ).then(
    response => {
      console.log(response);
      //consoleSeleccionada.mensaje = response.data.mensaje;
      //handleModalMensaje();
      if(response.data.estado===1)
        InsertarParticipacion();
      else
        alert("Error al insertar  el estudiante intente mas tardeee");
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};

//**Update  Integrante */
const UpdateEstudiante=async()=>{
  
  handleModalUpdate();
    //console.log();
    await axios.post(baseUrl_estudiante,{
      _metod: 'Update',  
      Rude:           consoleSeleccionada.rude,
      Nombre:         consoleSeleccionada.nombre,
      ApPaterno:      consoleSeleccionada.appaterno,
      ApMaterno:      consoleSeleccionada.apmaterno,
      Celular:        consoleSeleccionada.celular,
      FechaNac:       consoleSeleccionada.fechanac,
      Genero:         value,
      Ci:             consoleSeleccionada.ci,
      Correo:         consoleSeleccionada.correo
    },header()
  ).then(
    response => {
      console.log(response);
      InsertarParticipacion();
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};

/**AGREGAR eSTUDIANTE */
const getByIdEstudiante=async(event)=>{
  event.preventDefault();
    handleModalInsertRude();
    await axios.post(baseUrl_estudiante,{
        _metod: 'getById',   
        idOlimpiada:    cookies.get('idolimpiada'),
        Rude:           consoleSeleccionada.rude
      },header()
    ).then(
      response => {
        
        console.log("responseee1")
        console.log(response);
        if(response.data.estado===1){
          if(response.data.val.m===0){
            handleModalUpdate();
            console.log("responseee4")
            console.log(response.data.val);
            console.log(consoleSeleccionada)
            setConsolaSeleccionada(response.data.val);  
            
            console.log("responseee5")
            console.log("genro = "+response.data.val.genero);
            setValue(response.data.val.genero);
            console.log("******************************");
            console.log(consoleSeleccionada);
            console.log(response.data.val);
          }else{
            console.log(consoleSeleccionada);
            setMensaje("El estudiante ya esta registrado en otro grupo");
            handleModalMensaje();
          }
        }else{
          handleModalInsert();
          console.log("Estado 2");
          console.log(consoleSeleccionada);
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  
}
//**Abri Modulo para agregar un participoante */
const AgregarParticipante =async()=>{
  console.log("Agrenamos Participante");
  //setEstudiantes([]);
  handleModalInsertRude();
  //getAllEstudiantesPorTutor();
}
const ClickAcordeon= () =>{
  if(openAcordeon){
    getAllEstudiantesDeGrupo();
    handleAcordeon();
  }
}

function calcularEdad(fecha) {
  var hoy = new Date(cookies.get('fechalimiteedad'));
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}
useEffect(async()=>{
  //console.log(props);
  //console.log(calcularEdad('1990-08-02'));
},[]);
  return (
    <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={ClickAcordeon}
            >
            <Typography className={classes.heading}>Estudiantes</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {(data.length===0)?<Alert severity="error">Este grupo no tiene integrantes!</Alert>:''}
            <div className={classes.content}>
            <Table>
            <TableBody>
                {data.map(console =>(
                <TableRow key={console.rude}>
                    <TableCell>{console.appaterno} {console.apmaterno} {console.nombre}<br/><strong>Rude:</strong>{console.rude}</TableCell>
                    <TableCell>
                        <HighlightOffIcon onClick={()=>{seleccionarConsola(console,'Borrar')}} color="secondary"/>
                        
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        {
            (data.length<props.limiteporgrupo)?<Button className={classes.inputMaterial} onClick={AgregarParticipante} variant="contained"color="default"><PersonAddIcon/>{(data.length===0)?'':"Agregar Estudiante"}</Button>:''
        }
        </div>
            </AccordionDetails>
        </Accordion>
    
    

        <Modal
          open={openModalInsert}
          onClose={handleModalInsert}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
              <h3 id="simple-modal-title">Agregar Estudiante</h3>
              <div >
              <form onSubmit={InsertEstudiante} >
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField variant="outlined" disabled={true} margin="normal" fullWidth name='rude' required label="Rude"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.rude} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='appaterno' required label="Ap. Paterno"  onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='apmaterno' required label="Ap. Materno"  onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='nombre' required label="Nombres"  onChange={handleChangle} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={4} sm={4} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='ci' required label="Carnet"  onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='correo' required label="Correo"  type="email" onChange={handleChangle} />
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='celular' required label="Celular"  onChange={handleChangle} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      
                      <GridItem xs={6} sm={6} md={3}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='fechanac' required label="fechaNac"  type="date" InputLabelProps={{shrink:true}} onChange={handleChangle}  />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">genero</FormLabel>
                          <RadioGroup row aria-label="position" name="genero" value={'femenino'} onChange={handleChangeRadio}>
                            <FormControlLabel value="femenino" control={<Radio color="primary"/>} label="Femenino" labelPlacement="start" />
                            <FormControlLabel value="masculino" control={<Radio color="primary"/>} label="Masculino" labelPlacement="start"/>
                          </RadioGroup>
                        </FormControl>
                      </GridItem>
                  </GridContainer>
      {(consoleSeleccionada&&(calcularEdad(consoleSeleccionada.fechanac)>props.limiteporedad))?<Alert severity="error">El estudiante no esta en los limites de edad permitida para este nivel, las condiciones necesarias son que el estudiante tenga menor o igual a <strong>{props.limiteporedad}</strong> años hasta el <strong>{cookies.get('fechalimiteedad')}</strong>!</Alert>:''}
                  <Divider/>
                <AccordionActions>
                  <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
                  <Button type="submit"  variant="contained" color="primary"  >Guardar</Button>
                </AccordionActions>
              </form>
              </div>
            </div>
          
        </Modal>


        <Modal
          open={openModalUpdate}
          onClose={handleModalUpdate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
              <h3 id="simple-modal-title">Modificar Estudiante</h3>
              <div >
              <form onSubmit={UpdateEstudiante} >
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField variant="outlined" disabled={true} margin="normal" fullWidth name='rude' required label="Rude"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.rude} />
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='appaterno' required label="Ap. Paterno"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.appaterno} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='apmaterno' required label="Ap. Materno"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.apmaterno} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='nombre' required label="Nombres"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.nombre}/>
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      <GridItem xs={4} sm={4} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='ci' required label="Carnet"  onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.ci} />
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='correo' required label="Correo"  type="email" onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.correo}/>
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='celular' required label="Celular"  onChange={handleChangle}  value={consoleSeleccionada&&consoleSeleccionada.celular}/>
                      </GridItem>
                  </GridContainer>
                  <GridContainer >
                      
                      <GridItem xs={6} sm={6} md={3}>
                        <TextField variant="outlined"  margin="normal" fullWidth name='fechanac' required label="fechaNac"  type="date" InputLabelProps={{shrink:true}} onChange={handleChangle} value={consoleSeleccionada&&consoleSeleccionada.fechanac} />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">genero</FormLabel>
                          <RadioGroup row aria-label="position" name="genero"  value={value} onChange={handleChangeRadio}>
                            <FormControlLabel value="femenino" control={<Radio color="primary"/>} label="Femenino" labelPlacement="start" />
                            <FormControlLabel value="masculino" control={<Radio color="primary"/>} label="Masculino" labelPlacement="start"/>
                          </RadioGroup>
                        </FormControl>
                      </GridItem>
                  </GridContainer>
      {(consoleSeleccionada&&(calcularEdad(consoleSeleccionada.fechanac)>props.limiteporedad))?<Alert severity="error">El estudiante no esta en los limites de edad permitida para este nivel, las condiciones necesarias son que el estudiante tenga menor o igual a <strong>{props.limiteporedad}</strong> años hasta el <strong>{cookies.get('fechalimiteedad')}</strong>!</Alert>:''}
                  <Divider/>
                <AccordionActions>
                  <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
                  <Button type="submit"  variant="contained" color="primary"  >Guardar</Button>
                </AccordionActions>
              </form>
              </div>
            </div>
          
        </Modal>






        <Modal
          open={openModalInsertRude}
          onClose={handleModalInsertRude}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
              <h3 id="simple-modal-title">Agregar Nuevo Integrante</h3>
              <div>
              <form onSubmit={getByIdEstudiante} >
                  <GridContainer >
                      <GridItem xs={12} sm={12} md={12}>
                      <TextField variant="outlined"  margin="normal" fullWidth name='rude' required label="Rude" type="number" onChange={handleChangle}  />
                      </GridItem>
                  </GridContainer>
                  <Alert severity="info">
                  El <strong>Registro Único de Estudiantes</strong> o mejor conocido como <strong>RUDE</strong> es el documento que funciona como registro al Ministerio de Educación.

                  </Alert>
                  <Divider/>
                  <AccordionActions>
                    <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsertRude} >Cancelar</Button>
                    <Button type="submit"  variant="contained" color="primary"  >Siguiente</Button>
                  </AccordionActions>
                  </form>  
              </div>    
              
          
          </div >

        </Modal>
        <Modal
          open={openModalMensaje}
          onClose={handleModalMensaje}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h1 id="simple-modal-title"><strong>Mensaje:</strong></h1>
            <br/>
            <Alert severity="error">{mensaje}!</Alert>

            <br/>
            <Divider/>
                <AccordionActions>
                <Button type="submit"  variant="contained" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
                </AccordionActions>
              
          </div>
        </Modal>

    </div>
  );
}

export default GestionDeIntegrante;
