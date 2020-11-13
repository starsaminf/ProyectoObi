import React ,{ useEffect, useState }from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TexField, Input} from '@material-ui/core';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';

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
  }
}));

//const useStyles = makeStyles(styles);

export default function OLimpiada() {
  const classes = useStyles();
  const [data,setData]=useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idolimpiada:cookies.get('idolimpiada'),
    idetapa:'',
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
      [name]:value
    }))
  }
  const handleModalMensaje = () => {
    setOpenMensaje(!openModalMensaje);
  };
  //**      GETBYID  */
const getbyId=async()=>{
  console.log("GTEbYiD");
    await axios.post(baseUrl,{
        _metod:         'getById',
        tipo:           consoleSeleccionada.tipo,
        idOlimpiada:    consoleSeleccionada.idolimpiada
    },header()
  ).then(
    response => {
      console.log(response);
      if(response.data.estado===1){
        const v = response.data.val;
        consoleSeleccionada.idetapa =""+v.idetapa;
        consoleSeleccionada.nombre =""+v.nombre;
        consoleSeleccionada.descripcion =""+v.descripcion;
        consoleSeleccionada.fechaini =""+v.fechaini;
        consoleSeleccionada.fechafin =""+v.fechafin;
        setConsolaSeleccionada(prevState=>({
          ...prevState,
          ['estado']:""+v.estado
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
      console.log(response);
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
useEffect(async()=>{
    
  getbyId();
},[]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Detalles de la Etapa</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>

                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button type="submit" fullWidth variant="contained" color="primary" >Guardar Cambios</Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Estudiantes</h4>
              <p className={classes.cardCategoryWhite}>Estudiantes aprobados</p>
            </CardHeader>
            <CardBody>
              Aqui van los estudiantes weeee
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
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
