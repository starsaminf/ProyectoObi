import React ,{ useEffect, useState }from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import {Divider, TextField} from '@material-ui/core';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, Input} from '@material-ui/core';

// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
//**  EXPANDIBLE */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
const baseUrl=HOST.Url+'Etapa.php';
//"../../variables/general.js";
const cookies = new Cookies();


//Estilos
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "100",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "1px",
    textDecoration: "none"
  }
};
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}
function header(){
  return {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  root: {
    width: '100%',
  },
}));

//const useStyles = makeStyles(styles);

export default function DescripcionEtapa(props) {
  const classes = useStyles();
  const [data,setData]=useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [value,   setValue]    = useState(false);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idolimpiada:cookies.get('idolimpiada'),
    idetapa:props.idetapa,
    tipo:'1',//enesta parte describimos el nivel 
    nombre:'',
    descripcion:'',
    fechaini:'',
    fechafin:'',
    mensaje:'',
    estado:''
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:(value===null)?'':value
    }))
  }
  const handleModalMensaje = () => {
    setOpenMensaje(!openModalMensaje);
  };
  //**      GETBYID  */
const getbyId=async()=>{
    await axios.post(baseUrl,{
        _metod:         'getById',
        idEtapa:        consoleSeleccionada.idetapa,
        idOlimpiada:    consoleSeleccionada.idolimpiada
    },header()
  ).then(
    response => {
      console.log(response);
      if(response.data.estado===1){
        consoleSeleccionada.nombre=(response.data.val.nombre===null)?"":response.data.val.nombre;
        consoleSeleccionada.descripcion=(response.data.val.descripcion===null)?"":response.data.val.descripcion;
        consoleSeleccionada.fechaini=(response.data.val.fechaini===null)?"":response.data.val.fechaini;
        consoleSeleccionada.fechafin=(response.data.val.fechafin===null)?"":response.data.val.fechafin;
        setConsolaSeleccionada(prevState=>({
          ...prevState,
          ['mensaje']:""
        }))
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
/** CREMOS ETAPAS */

//**      UPDATE  */
const Update=async()=>{
    consoleSeleccionada.mensaje='';
    await axios.post(baseUrl,{
        _metod: 'Update',
        idEtapa:        consoleSeleccionada.idetapa,
        Nombre:         consoleSeleccionada.nombre,
        Descripcion:    consoleSeleccionada.descripcion,
        FechaIni:       consoleSeleccionada.fechaini,
        FechaFin:       consoleSeleccionada.fechafin     
        
    },header()
  ).then(
    response => {
      setConsolaSeleccionada(prevState=>({
        ...prevState,
        ['mensaje']:response.data.mensaje
      }))
      handleModalMensaje();
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
const handleSubmit = event =>{
  event.preventDefault();
  Update();
  //ejecutamos el axios
}
const ClickAccion = () =>{
  if(!value){
    getbyId();
    setValue(!value);
  }
}
useEffect(async()=>{
},[]);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={ClickAccion}
          >
            <Typography className={classes.heading}>Detalles de etapa</Typography>
          </AccordionSummary>
          <AccordionDetails  >  
          <GridItem xs={12} sm={12} md={6}>       
              <form onSubmit={handleSubmit} className={classes.root}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre de  Etapa" value={consoleSeleccionada.nombre} onChange={handleChangle}/>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField variant="outlined"  multiline={true} rows={5} margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Descripcion de la Etapa" value={consoleSeleccionada.descripcion} onChange={handleChangle} />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fechaini"
                      label="Fecha Inicio"
                      name="fechaini"
                      type="date"
                      InputLabelProps={{shrink:true}}
                      value={consoleSeleccionada.fechaini}
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fechafin"
                      name="fechafin"
                      label="Fecha final"
                      type="date"
                      InputLabelProps={{shrink:true}}
                      value={consoleSeleccionada.fechafin}
                      onChange={handleChangle}
                    />
                  </GridItem>
                 
                </GridContainer>
                <Divider/>
                <AccordionActions>
                  <Button type="submit"variant="contained" color="primary" >Guardar Cambios</Button>
                  
                </AccordionActions>
              </form>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <ReactMarkdown>{"## "+consoleSeleccionada.nombre+"\n"+consoleSeleccionada.descripcion}</ReactMarkdown>
              </GridItem>
              
      </AccordionDetails>
                          </Accordion>
      <Modal
          open={openModalMensaje}
          onClose={handleModalMensaje}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h1 id="simple-modal-title">Mensaje...</h1>
            <br/>
            <h4>{consoleSeleccionada.mensaje}</h4>
            <br/>
              <Button type="submit" className={classes.inputMaterial} variant="outlined" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
          </div>
        </Modal>
    </div>
  );
}
