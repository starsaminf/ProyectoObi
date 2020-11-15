import React , { useEffect, useState }from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import ReactMarkdown from 'react-markdown'

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import CardFooter from "../../components/Card/CardFooter.js";
// host variables
const baseUrl_Olimpiada=HOST.Url+'Olimpiada.php';
const baseUrl_Nivel=HOST.Url+'Nivel.php';
const baseUrl_Etapa=HOST.Url+'Etapa.php';
//"../../variables/general.js";
const cookies = new Cookies();
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '100%',
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
export default function UserProfile() {
  const classes = useStyles();
  const [nivel,setNivel]=useState([]);
  const [etapa,setEtapa]=useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    nombre:'',
    fechaini:'',
    fechafin:'',
    descripcion:''
  })
  function header(){
    return {
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  };

    //**      getByOLimpiadas  */
    const getByIdOlimpiada=async()=>{
      await axios.post(baseUrl_Olimpiada,{
            _metod: 'getById',
            idOlimpiada: cookies.get('idolimpiada')
      },header()
    ).then(
      response => {
        console.log(response);
        if(response.data.estado===1){
          setConsolaSeleccionada(response.data.val);
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  };
    //**      getNiveles  */
    const getAllNiveles=async()=>{
        await axios.post(baseUrl_Nivel,{
              _metod: 'getAll',
              idOlimpiada: cookies.get('idolimpiada')
        },header()
      ).then(
        response => {
          console.log(response);
          if(response.data.estado===1){
            setNivel(response.data.val);
          }
        }
      ).catch(
        error=>{
          alert(error+"");
        }
      )
    };
    //**      getNiveles  */
    const getAllEtapa=async()=>{
        await axios.post(baseUrl_Etapa,{
              _metod: 'getAll',
              idOlimpiada: cookies.get('idolimpiada')
        },header()
      ).then(
        response => {
          console.log(response);
          if(response.data.estado===1){
            setEtapa(response.data.val);
          }
        }
      ).catch(
        error=>{
          alert(error+"");
        }
      )
    };
  useEffect(async()=>{
    getByIdOlimpiada();
    getAllNiveles();
    getAllEtapa();
  },[]);
  return (
    <div>
        <div className={classes.content}>
            <div className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>{consoleSeleccionada.nombre}</h4>
                                <div className={classes.cardCategoryWhite}>Detalles</div>
                            </CardHeader>
                            <CardBody>
                                <ReactMarkdown>{consoleSeleccionada.descripcion}</ReactMarkdown>
                                <GridContainer>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <strong>Inicio:   </strong>{consoleSeleccionada.fechaini}
                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <strong>Final:   </strong>{consoleSeleccionada.fechafin}
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Niveles</h4>
                            </CardHeader>
                            <CardBody>
                                {nivel.map(console =>(
                                    <Card key={console.idnivel}>
                                        <CardHeader color="success">
                                            <h6 className={classes.cardTitleWhite}>{console.nombre}</h6>
                                        </CardHeader>
                                        <CardBody>
                                            <ReactMarkdown>{console.descripcion}</ReactMarkdown>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <strong>Modo:   </strong>{console.tipo}
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                ))}

                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Etapas</h4>
                            </CardHeader>
                            <CardBody>
                                {etapa.map(console =>(
                                    <Card key={console.idetapa}>
                                        <CardHeader color="success">
                                            <h6 className={classes.cardTitleWhite}>{console.nombre}</h6>
                                        </CardHeader>
                                        <CardBody>
                                            <ReactMarkdown>{console.descripcion}</ReactMarkdown>
                                            <GridContainer>
                                                <GridItem xs={12} sm={6} md={6}>
                                                    <strong>Inicio:   </strong>{console.fechaini}
                                                </GridItem>
                                                <GridItem xs={12} sm={6} md={6}>
                                                    <strong>Final:   </strong>{console.fechafin}
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                ))}
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    </div>
  );
}