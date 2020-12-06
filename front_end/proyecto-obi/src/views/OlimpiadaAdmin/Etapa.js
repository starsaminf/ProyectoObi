import React,{ useEffect, useState,useCallback }from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DescripEtapa from '../../views/OlimpiadaAdmin/Components/DescripEtapa.js';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
/**Pasos */
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from '@material-ui/core/Button';
import GrupoEtapa from './Components/GrupoEtapa.js';
import NotasYObserbaciones from './Components/Notas_Y_Obserbaciones.js';
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


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [data,setData]=useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  
/** Pasos adelante y atras */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //getAllEtapa
  const getAllEtapa=useCallback(async()=>{
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
  },[setData]);
  //getPorDEfecto
  useEffect(()=>{
    //llamamos todas las etapas
    getAllEtapa();
  },[getAllEtapa]);
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
                              <NotasYObserbaciones idetapa={console.idetapa} tipo={console.tipo}/>
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
