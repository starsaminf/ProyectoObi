import React,{ useEffect, useState }from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DescripEtapa from '../../views/OlimpiadaAdmin/Components/DescripEtapa.js';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
//**  EXPANDIBLE */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/**Pasos */
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import GrupoEtapa from './Components/GrupoEtapa.js';
import Notas_Y_Obserbaciones from './Components/Notas_Y_Obserbaciones.js';
import TablaDePosiciones from './Components/TablaDePosiciones.js';
import { Divider } from '@material-ui/core';
const baseUrl=HOST.Url+'Etapa.php';
//"../../variables/general.js";
const cookies = new Cookies();
function header(){
  return {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};
function TabPanel(props) {
  const classes = useStyles();
  const { children, value,idetapa, index, ...other } = props;

  return (<div>
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          
          
        </Box>
      )}
    </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  idetapa: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [data,setData]=useState([]);
  const [value, setValue] = React.useState(0);
  const [nivel,setNivel]=useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
/** Pasos adelante y atras */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //getAllEtapa
  const getAllEtapa=async()=>{
      await axios.post(baseUrl,{
          _metod:         'getAll',
          idOlimpiada:    cookies.get('idolimpiada')
      },header()
    ).then(
      response => {
        if(response.data.estado===1){
          setData(response.data.val);
        }else{
          alert("NO se crearon las etapas");
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  };
  //getPorDEfecto
  useEffect(async()=>{
    //llamamos todas las etapas
    getAllEtapa();
  },[]);
  return (
    <div className={classes.root}>      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Etapas</h4>
                </CardHeader>
                <CardBody>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {data.map(console =>(
                      
                      <Step key={console.idetapa}>
                        <StepLabel><strong>{console.nombre}</strong><br/></StepLabel>
                        <StepContent>
                        <Divider/>
                              <DescripEtapa idetapa={console.idetapa} />
                              <Divider/>
                              <GrupoEtapa idetapa={console.idetapa} tipo={console.tipo}/>
                              <Divider/>
                              <Notas_Y_Obserbaciones idetapa={console.idetapa} tipo={console.tipo}/>
                              <Divider/>
                              <TablaDePosiciones idetapa={console.idetapa} tipo={console.tipo}/>
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
                              disabled={activeStep === data.length - 1 }
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
  );
}
