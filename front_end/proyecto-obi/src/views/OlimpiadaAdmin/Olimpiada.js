import React ,{ useEffect, useState }from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import {Modal} from '@material-ui/core';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import ReactMarkdown from 'react-markdown';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';

const baseUrl=HOST.Url_Admin+'Olimpiada.php';
//"../../variables/general.js";
const cookies = new Cookies();

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}
const header = HOST.header(cookies.get('token'));
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
  const [modalStyle] = useState(getModalStyle);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    descripcion: "",
    estado: "",
    fechafin: "",
    fechaini: "",
    fechalimiteedad: "",
    idadmin: 0,
    n: 0,
    nombre: ""
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
//**      UPDATE  */
const Update=async()=>{
    consoleSeleccionada.mensaje='';
    await axios.post(baseUrl,{
        _metod: 'Update',
        idOlimpiada:    cookies.get('idolimpiada'),
        Nombre:         consoleSeleccionada.nombre,
        Descripcion:    consoleSeleccionada.descripcion,
        FechaIni:       consoleSeleccionada.fechaini,
        FechaFin:       consoleSeleccionada.fechafin,
        FechaLimiteEdad:consoleSeleccionada.fechalimiteedad,
        Estado:         consoleSeleccionada.estado,       
        idAdmin:        cookies.get('idusuario')
    },header
  ).then(
    response => {
      console.log(response);
      setMensaje(response.data.mensaje);
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
/*useEffect(()=>{  
  getbyId();
},[getbyId]);*/
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
     await axios.post(baseUrl,{
      _metod: 'getById',
      idOlimpiada:    cookies.get('idolimpiada')
    },header).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setConsolaSeleccionada(response.data.val);
          if(response.data.val.n===0){
            axios.post(baseUrl,{
             _metod: 'CrearEtapas',
             idOlimpiada:    cookies.get('idolimpiada')
             },header
           ).then(
             response => {
               console.log(response);
             }
           ).catch(
             error=>{
               console.log(error);
             }
           )
         }
        }
        setIsLoading(false);
      }
    ).catch(
      error=>{
        setIsLoading(false);
      }
    );
  };

  fetchData();
}, []);
  return (
    <div>
      <GridContainer>
          {(isLoading)?"CArgandooooooooooo":''}
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Detalles de la OLimpiada</h4>
              <p className={classes.cardCategoryWhite}>Detalles</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <form onSubmit={handleSubmit}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField variant="outlined" margin="normal" fullWidth name='nombre' required className={classes.nombre} label="Nombre de Olimpiada" value={consoleSeleccionada.nombre} onChange={handleChangle}/>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField variant="outlined"  multiline={true} rows={12} margin="normal" fullWidth name='descripcion' required className={classes.descripcion} label="Descripcion de la olimpiada" value={consoleSeleccionada.descripcion} onChange={handleChangle} />
                    Nota:
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
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
                    
                      value={(consoleSeleccionada.fechaini!==null)?consoleSeleccionada.fechaini:''}
                      onChange={handleChangle}
                    />
                  </GridItem>
                  
                  <GridItem xs={12} sm={4} md={4}>
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
                      value={(consoleSeleccionada.fechafin!==null)?consoleSeleccionada.fechafin:''}
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fechalimiteedad"
                      name="fechalimiteedad"
                      label="Fecha Limite para cumplir edad"
                      type="date"
                      InputLabelProps={{shrink:true}}
                      value={(consoleSeleccionada.fechalimiteedad!==null)?consoleSeleccionada.fechalimiteedad:''}
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
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <ReactMarkdown>{"## "+consoleSeleccionada.nombre+"\n"+consoleSeleccionada.descripcion}</ReactMarkdown>
              </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        
        
        
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
            <h4>{mensaje}</h4>
            <br/>
              <Button type="submit" className={classes.inputMaterial} variant="outlined" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
          </div>
        </Modal>
    </div>
  );
}
