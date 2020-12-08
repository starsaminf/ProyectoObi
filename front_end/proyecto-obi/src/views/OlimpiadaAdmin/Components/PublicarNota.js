import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import AccordionActions from '@material-ui/core/AccordionActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Modal, Divider} from '@material-ui/core';

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../../variables/general.js";
import axios from 'axios';

const baseUrl_Grupos=HOST.Url_Admin+'Nota.php';
const cookies = new Cookies();
//"../../variables/general.js";

const header = HOST.header(cookies.get('token'));
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));
function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
}
function PublicarNota(props) {
    
    const classes = useStyles();
    const [data,setData]=useState([]);
    const [code,setCode]=useState("");
    const [modalStyle] = useState(getModalStyle);
    const [openModalInsert,   setOpenInsert]    = useState(false);
    const [openModalMensaje,  setOpenMensaje]   = useState(false);
    const [mensaje,  setMensaje]   = useState([]);
    const handleModalInsert = () => {
        setOpenInsert(!openModalInsert);
      };
      const handleModalMensaje = () => {
        setOpenMensaje(!openModalMensaje);
      };
  const filePathset=(e)=> {
    //console.log(e);
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    e.target.value = null;
    //console.log(file);
    //readFile(this.state.file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const datos = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      //console.log("Data>>>" + datos);// shows that excel data is read
      //console.log(convertToJson(datos)); // shows data in json format
      //console.log(datos);
      handleModalInsert();
      setData(convertToJson(datos));
      //console.log(data);
    };
    reader.readAsBinaryString(file);
    
  }
  /*const handleChangleBuscador = e => {
    var search = data.filter(item=>{
      var cad= item.nombre+item.sie+item.nn+item.nd; 
      if(cad.includes(e.target.value))
        return item;
    });
    setData2(search);
  }*/

  const convertToJson=(csv)=> {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");
    var phpconect="";
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      obj[headers[0]] = currentline[0];
      obj[headers[3]] = currentline[3];
      obj[headers[4]] = currentline[4];
      obj[headers[5]] = currentline[5];
      if(obj.idgrupo!==''){
            result.push(obj);
            if(i!==0)
                phpconect+=";";
            phpconect+= currentline[0]+","+currentline[3]+","+currentline[4]+","+currentline[5];
        }
    }
    console.log(phpconect);
    setCode(phpconect);
    //return result; //JavaScript object
    //return JSON.stringify(result); //JSON String
    return result;                   //JSON Object
  }

  /**
   *const convertToJson = (csv) =>{
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
   */
  const InsertData=async()=>{
    //consoleSeleccionada.mensaje='';
    handleModalInsert();
    await axios.post(baseUrl_Grupos,{
        _metod:         'InsertAll',
        idNivel:        props.idNivel,     
        idEtapa:        props.idEtapa,
        Datos:          code
    },header
  ).then(
    response => {
        handleModalInsert();
        console.log(response);
        setMensaje(response.data.mensaje);
        handleModalMensaje();
        props.func();
        
        //console.log(response);
        //if(response.data.estado===1)
            //setData(response.data.val);
        //else
            //setData([]);
      /*setConsolaSeleccionada(prevState=>({
        ...prevState,
        ['mensaje']:response.data.mensaje
      }))
      handleModalMensaje();*/
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
  useEffect(()=>{
      //console.log("Subimos Notas*************");
    console.log(props);
    //console.log(props);
  },[props]);
    return (
      <div className={useStyles.root}>
        <input
            accept=".xlsx,.xls"
            type="file"
            id="file"
            className={classes.input}
          onChange={(e) => filePathset(e)}
        />

        <label htmlFor="file">
        <Button variant="contained" color="primary" component="span">
        <BackupIcon/>
          Actualizar Notas
        </Button>
      </label>




      <Modal
          open={openModalInsert}
          onClose={handleModalInsert}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
              <h3 id="simple-modal-title">Crear Grupo</h3>
              <div >
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                        Se detectaron  — <strong>{data.length}</strong> notas, seleccione continuar para registrar las notas
                </Alert> 
              </div>
              <AccordionActions>
                <Button variant='outlined' color='primary' onClick={handleModalInsert}>Cancelar</Button>
                <Button variant='contained' color='primary' onClick={InsertData}>Continuar..</Button>
            </AccordionActions>
            </div>
           
        </Modal>


        <Modal
          open={openModalMensaje}
          onClose={handleModalMensaje}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
            <h1 id="simple-modal-title"><strong>Mensaje:</strong></h1>
            <br/>
            <Alert severity="info">{mensaje}!</Alert>

            <br/>
            <Divider/>
                <AccordionActions>
                <Button type="submit"  variant="contained" color="primary" onClick={handleModalMensaje} >Aceptar</Button>
                </AccordionActions>
              
          </div>
        </Modal>


      </div>
    );
  
}

export default PublicarNota;