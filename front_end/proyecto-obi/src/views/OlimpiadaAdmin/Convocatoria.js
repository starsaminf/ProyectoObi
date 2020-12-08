import React , { useEffect, useState,useCallback }from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
/**Pasos */
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';

///para la tablaaaaa
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
// host variables
const baseUrl_Olimpiada=HOST.Url_Admin+'Olimpiada.php';
const baseUrl_Nivel=HOST.Url_Admin+'Nivel.php';
const baseUrl_Etapa=HOST.Url_Admin+'Etapa.php';
//"../../variables/general.js";
const cookies = new Cookies();
function TabPanel(props) {
  const { children, value,descripcion,limiteporgrupo,limiteporedad, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
          <ReactMarkdown>{descripcion}</ReactMarkdown>
          <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                  <strong>Maximo numero de integrantes:   </strong>{limiteporgrupo}
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                  <strong>Edad Maxima:   </strong>{limiteporedad}
              </GridItem>
          </GridContainer>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  descripcion: PropTypes.any.isRequired,
  limiteporgrupo: PropTypes.any.isRequired,
  limiteporedad: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
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
    },
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
const header = HOST.header(cookies.get('token'));
export default function UserProfile() {
  const classes = useStyles();
  
  const [etapa,setEtapa]=useState([]);
  const [value, setValue] = React.useState(0);
  const [nivel, setNivel] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    nombre:'',
    fechaini:'',
    fechafin:'',
    descripcion:''
  })
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  
    //**      getByOLimpiadas  */
    const getByIdOlimpiada=useCallback(async()=>{
      await axios.post(baseUrl_Olimpiada,{
            _metod: 'getById',
            idOlimpiada: cookies.get('idolimpiada')
      },header
    ).then(
      response => {
        //console.log(response);
        if(response.data.estado===1){
          setConsolaSeleccionada(response.data.val);
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  },[setConsolaSeleccionada]);
    //**      getNiveles  */
    const getAllNiveles=useCallback(async()=>{
        await axios.post(baseUrl_Nivel,{
              _metod: 'getAll',
              idOlimpiada: cookies.get('idolimpiada')
        },header
      ).then(
        response => {
          //console.log(response);
          if(response.data.estado===1){
            setNivel(response.data.val);
          }
        }
      ).catch(
        error=>{
          alert(error+"");
        }
      )
    },[setNivel]);
    //**      getNiveles  */
    const getAllEtapa=useCallback(async()=>{
        await axios.post(baseUrl_Etapa,{
              _metod: 'getAll',
              idOlimpiada: cookies.get('idolimpiada')
        },header
      ).then(
        response => {
          //console.log(response);
          if(response.data.estado===1){
            setEtapa(response.data.val);
          }
        }
      ).catch(
        error=>{
          alert(error+"");
        }
      )
    },[setEtapa]);
    const Buscar = (e)=>{
      for (let index = 0; index < nivel.length; index++) {
        const element = nivel[index];
        if(e===element.idnivel)
          return index;
      }
    }
  useEffect(()=>{
    getByIdOlimpiada();
    getAllNiveles();
    getAllEtapa();
  },[getByIdOlimpiada, getAllNiveles, getAllEtapa]);
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

<div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {nivel.map(console =>(
            <Tab label={console.nombre} key={console.idnivel} {...a11yProps(Buscar(console.idnivel))}/>
          ))}
        </Tabs>
      </AppBar>
      {nivel.map(console =>(
        <TabPanel value={value} key={console.idnivel} descripcion={console.descripcion} limiteporgrupo={console.limiteporgrupo} limiteporedad={console.limiteedad} index={Buscar(console.idnivel)}/>
      ))}
    </div>

                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Etapas</h4>
                            </CardHeader>
                            <CardBody>
                              <Stepper activeStep={activeStep} orientation="vertical">
                                {etapa.map(console =>(
                                  
                                  <Step key={console.idetapa}>
                                    <StepLabel><strong>{console.nombre}</strong><br/></StepLabel>
                                    <StepContent>
                                    <ReactMarkdown>{console.descripcion}</ReactMarkdown>
                                      
                                    <GridContainer>
                                      <GridItem xs={12} sm={6} md={6}>
                                          <strong>Inicio:   </strong>{console.fechaini}
                                      </GridItem>
                                      <GridItem xs={12} sm={6} md={6}>
                                          <strong>Final:   </strong>{console.fechafin}
                                      </GridItem>
                                    </GridContainer>
                                    <br/>
                                      
                                    
                                    <div className={classes.actionsContainer}>
                                      <div>
                                        <Button
                                          disabled={activeStep === 0}
                                          onClick={handleBack}
                                          className={classes.button}
                                        >
                                          Back
                                        </Button>
                                        <Button
                                          disabled={activeStep === etapa.length - 1 }
                                          variant="contained"
                                          color="primary"
                                          onClick={handleNext}
                                          className={classes.button}
                                        >
                                          {activeStep === console.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                      </div>
                                    </div>
                                  </StepContent>
                                
                                    
                                  </Step>
                                ))}
                              </Stepper>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    </div>
  );
}