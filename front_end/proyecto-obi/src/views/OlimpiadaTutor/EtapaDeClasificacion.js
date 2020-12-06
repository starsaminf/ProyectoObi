import React,{ useEffect, useState,useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//import InscribirParticipante from './InscribirParticipante.js';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import PaguinaResultados from './PaguinaResultados.js';
const baseUrl=HOST.Url+'Nivel.php';
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
  const { children, value,idnivel,idetapa,tipo, index, ...other } = props;
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
            <PaguinaResultados idnivel={idnivel} idetapa={idetapa} tipo={tipo}/>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  idnivel: PropTypes.any.isRequired,
  idetapa: PropTypes.any.isRequired,
  tipo: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function EtapaDeClasificacion(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data,setData]=useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//getAllEtapa
const getAllEtapa=useCallback(async()=>{
  await axios.post(baseUrl,{
      _metod:         'getAll',
      idOlimpiada:    cookies.get('idolimpiada')
  },header()
).then(
  response => {
    //console.log(response);
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
const Buscar = (e)=>{
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if(e===element.idnivel)
      return index;
  }
}
//getPorDEfecto
useEffect(()=>{
//llamamos todas las etapas
console.log("Holaaaa");
console.log(props);
getAllEtapa();
},[getAllEtapa,props]);
  return (
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
          {data.map(console =>(
            <Tab label={console.nombre} key={console.idnivel} {...a11yProps(Buscar(console.idnivel))}/>
          ))}
        </Tabs>
      </AppBar>
      {data.map(console =>(
        <TabPanel value={value} key={console.idnivel} idnivel={console.idnivel}  idetapa={props.idetapa} tipo ={props.tipo} index={Buscar(console.idnivel)}/>
      ))}
    </div>
  );
}
