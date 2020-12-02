
import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
//**  EXPANDIBLE */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';
import {Table,  TableCell, TableBody, TableRow,TextField,  Modal, TableHead} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InfoIcon from '@material-ui/icons/Info';
import BallotIcon from '@material-ui/icons/Ballot';
import { Divider } from '@material-ui/core';
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import {Edit,Delete} from '@material-ui/icons';
const baseUrlMaterial=HOST.Url+'MaterialdeApoyo.php';
const baseUrlSugerencia_para=HOST.Url+'Sugerencia_para.php';
//"../../variables/general.js";
const cookies = new Cookies();
//************************** */
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
    inputMaterial2:{
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

function MaterialDeNivel(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openAcordeon,  setOpenAcordeon]   = useState(true);
    const [data,  setData]   = useState([]);
    const [data1,  setData1]   = useState([]);
    const [openModalMensaje,  setOpenMensaje]   = useState(false);
    const [mensaje,  setMensaje]   = useState([]);
    const [consoleSeleccionada, setConsolaSeleccionada]= useState({
        idmaterial:       '',
        titulo:           '',
        subtitulo:        '',
        esta:             false
      })
    
      const handleModalMensaje = () => {
        setOpenMensaje(!openModalMensaje);
      };
      
    const ClickAcordeon= () =>{
        if(openAcordeon){
            getAllMaterial();
            //handleAcordeon();
        }
      }
      const seleccionarConsola =(consola)=>{
        console.log("Sleccionamos consola");
        consoleSeleccionada.idmaterial=consola.idmaterial;
          if(consola.esta){
            Delete();
            console.log("Borrar");
            //BorrarSugerencia();
          }else{
            Insert();
            console.log("agregar");
            //InsertarSugerencia();
          }
      };
    //******  getAll
    const getAllMaterial = async () =>{
        await axios.post(baseUrlMaterial,{
            _metod:     'getAllNivelAdmin',
            idAdmin:    cookies.get('idusuario'),
            idNivel:    props.idNivel 
        }, header()
        ).then(
            response => {
              console.log("***************material");
              console.log(response);
              if(response.data.estado===1){
                  setData(response.data.val);
                  //console.log(data);
              }else{
                  
              }
            }
        ).catch(
            error=>{
            
            //console.log(error);
            }
        )    
    }
    //******  getAll
    const Insert = async () =>{
      await axios.post(baseUrlSugerencia_para,{
          _metod:         'Insert',
          idMaterial:     consoleSeleccionada.idmaterial,
          idNivel:        props.idNivel 
      }, header()
      ).then(
          response => {
            if(response.data.estado===1){
                getAllMaterial();
            }
          }
      ).catch(
          error=>{
          //console.log(error);
          }
      )    
  }
  const Delete = async () =>{
    await axios.post(baseUrlSugerencia_para,{
        _metod:         'Delete',
        idMaterial:     consoleSeleccionada.idmaterial,
        idNivel:        props.idNivel 
    }, header()
    ).then(
        response => {
          console.log(response);
          if(response.data.estado===1){
              getAllMaterial();
          }
        }
    ).catch(
        error=>{
        //console.log(error);
        }
    )    
}
    useEffect(async()=>{
        //console.log(props);
        //console.log(calcularEdad('1990-08-02'));
    },[]);
  return (
    <div>
      <Divider/>
        <Accordion >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography className={classes.heading}><InfoIcon color="primary"/>Descripción</Typography>
            </AccordionSummary >
            <AccordionDetails color="primary">
                <Divider/>
                <ReactMarkdown>
                    {props.descripcion}
                </ReactMarkdown>
            </AccordionDetails>
        </Accordion>
        <Accordion >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={ClickAcordeon}
            color="primary"
            >
            <Typography className={classes.heading}><BallotIcon color="primary"/>Materiales de Apoyo</Typography>
            </AccordionSummary >
            <AccordionDetails >
            
            <div className={classes.content}>
            {(data.length===0)?<><Alert severity="error">Este Nivel no tiene Material de Apoyo!</Alert><br/></>:''}
            <Table>
              <TableHead>
              <TableRow >
                  <TableCell>titulo</TableCell>
                  <TableCell>tipo</TableCell>
                    <TableCell>
                        Opcion
                    </TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
                      
                {data.map(console =>(
                <TableRow key={console.idmaterial}>
                    <TableCell><strong>{console.titulo}</strong><br/> {console.subtitulo}</TableCell>
                    <TableCell>{console.tipo}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={<Switch checked={console.esta} onClick={()=>{seleccionarConsola(console)}} />}
                        label="Normal"
                      />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
                 
                </div>
            </AccordionDetails>
        </Accordion>
    </div>
  );
}

export default MaterialDeNivel;