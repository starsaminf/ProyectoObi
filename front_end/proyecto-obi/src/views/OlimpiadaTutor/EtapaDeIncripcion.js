import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InscribirGrupo from './InscribirGrupo.js';
// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';


const baseUrl=HOST.Url_Tutor+'Nivel.php';
//"../../variables/general.js";
const cookies = new Cookies();
const header = HOST.header(cookies.get('token'));
function TabPanel(props) {
  const { children, value,idnivel,limiteporgrupo,limiteporedad, index, ...other } = props;
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
            <InscribirGrupo idnivel={idnivel} limiteporgrupo={limiteporgrupo} limiteporedad={limiteporedad} fechaMax={cookies.get('fechalimiteedad')}/>
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
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data,setData]=useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//getAllEtapa
const getAllEtapa=async()=>{
  await axios.post(baseUrl,{
      _metod:         'getAll',
      idOlimpiada:    cookies.get('idolimpiada')
  },header
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
};
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
getAllEtapa();
},[]);
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
        <TabPanel value={value} key={console.idnivel} idnivel={console.idnivel} limiteporgrupo={console.limiteporgrupo} limiteporedad={console.limiteedad} index={Buscar(console.idnivel)}/>
      ))}
    </div>
  );
}
