import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import ReactMarkdown from 'react-markdown';
const baseUrl=HOST.Url_Admin+'MaterialdeApoyo.php';
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: 1200,
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
const header = HOST.header(cookies.get('token'));

export default function MaterialdeApoyo() {
  //const baseUrl = HOST.Url+"Noticia.php";
  //const idAdmin='1';
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [openModalMensaje, setOpenMensaje] = useState(false);
  const [data,setData]=useState([]);
  const [data2,setData2]=useState([]);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idmaterial:'',
    titulo:'',
    subtitulo:'',
    tipo:'',
    archivo:'',
    contenido:'',
    mensaje:''
  })
  const handleChangle = e => {
    
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
   
  }
  const handleChangleBuscador = e => {
    /******************* */
    if(e.target.value==='')
      setData2(data);
    else{
      var val=e.target.value.toLowerCase();
      var relevantCompanyMeasures = data
      .filter(c => (
        c.idnoticia+
        c.titulo+
        c.subtitulo+
        c.contenido+
        c.fecha+
        c.archivo
      ).toLowerCase().includes(val));
      setData2(relevantCompanyMeasures);
    }
  }
  const handleModalInsert = () => {
    setOpenInsert(!openModalInsert);
  };
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };
  const handleModalMensaje = () => {
    setOpenMensaje(!openModalMensaje);
  };
  //*** seleccionar consola */
const seleccionarConsola =(consola,caso)=>{
  setConsolaSeleccionada(consola);
  (caso==='Editar')?handleModalUpdate():handleModalDelete();
};

//******  getAll
  const getAll=async()=>{
      await axios.post(baseUrl,{_metod: 'getAll',idAdmin :cookies.get('idusuario')},header
    ).then(
      response => {
        if(response.data.estado===1){
          setData(response.data.val);
          setData2(response.data.val);
        }
      }
    ).catch(
      error=>{
        //setData2(data);
        console.log(error);
      }
    )
  };
  //*****   Insert */
  const Insert=async()=>{
    handleModalInsert();
      await axios.post(baseUrl,{
        _metod: 'Insert',
        Titulo:         consoleSeleccionada.titulo,
        SubTitulo:      consoleSeleccionada.subtitulo,
        Tipo:           consoleSeleccionada.tipo,
        Archivo:        consoleSeleccionada.archivo,
        idAdmin:        cookies.get('idusuario')
      },header
    ).then(
      response => {
        console.log(response);
        consoleSeleccionada.mensaje = response.data.mensaje;
        handleModalMensaje();
        if(response.data.estado===1){
          //setData(response.data.admin);
          getAll();
          consoleSeleccionada.username = '';
          consoleSeleccionada.pasword = '';
          consoleSeleccionada.correo = '';
        }
      }
    ).catch(
      error=>{
        alert(error+"");
      }
    )
  };
//**      UPDATE  */
const Update=async()=>{
  handleModalUpdate();
  
    await axios.post(baseUrl,{
        _metod: 'Update',
        idMaterial:     consoleSeleccionada.idmaterial,
        Titulo:         consoleSeleccionada.titulo,
        SubTitulo:      consoleSeleccionada.subtitulo,
        Tipo:           consoleSeleccionada.tipo,
        Archivo:        consoleSeleccionada.archivo,
        idAdmin:        cookies.get('idusuario')
    },header
  ).then(
    response => {
      console.log("********************");
      console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
        consoleSeleccionada.idnoticia = '';
        consoleSeleccionada.titulo = '';
        consoleSeleccionada.subtitulo = '';
        consoleSeleccionada.contenido = '';
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};
//** eliminar
const Eliminar=async()=>{
  handleModalDelete();
  
    await axios.post(baseUrl,{
      _metod: 'Delete',
        idAdmin:    cookies.get('idusuario'),
        idMaterialDeApoyo: consoleSeleccionada.idmaterial
    },header
  ).then(
    response => {
      //console.log(response);
      consoleSeleccionada.mensaje = response.data.mensaje;
      handleModalMensaje();
      if(response.data.estado===1){
        //setData(response.data.admin);
        getAll();
        consoleSeleccionada.idnoticia = '';
        consoleSeleccionada.titulo = '';
        consoleSeleccionada.subtitulo = '';
        consoleSeleccionada.contenido = '';
      }
    }
  ).catch(
    error=>{
      alert(error+"");
    }
  )
};

//******  se ejecuta cuando inicia el Componente
  useEffect(()=>{
    getAll();
  },[]);


  return (
    <div>
      <div>
        <Toolbar>
          <Typography variant="h2" noWrap className={classes.title}>
            Materiales de Apoyo
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            id="buscar"
            label="buscar"
            name="buscar"
            onChange={handleChangleBuscador}
          />
            &nbsp;&nbsp;&nbsp;
          <Button type="submit" variant="contained" color="primary" onClick={handleModalInsert} >+ Agregar</Button>       
        </Toolbar>        
      </div>  
      <TableContainer className={classes.content}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell><strong >id</strong></TableCell>
              <TableCell><strong >Titulo/Subtitulo</strong></TableCell>
              <TableCell><strong >Tipo</strong></TableCell>
              <TableCell><strong >Archivo</strong></TableCell>
              <TableCell><strong >Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map(console =>(
              <TableRow key={console.idmaterial}>
                <TableCell>{console.idmaterial}</TableCell>
                <TableCell><strong >{console.titulo}</strong><br/>{console.subtitulo}</TableCell>
                <TableCell>{console.tipo}</TableCell>
                <TableCell>{console.archivo}</TableCell>
                <TableCell>
                  <Edit onClick={()=>{seleccionarConsola(console,'Editar')}} color="primary" />
                    &nbsp;&nbsp;&nbsp;
                  <Delete onClick={()=>{seleccionarConsola(console,'Eliminar')}} color="secondary"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>





        <Modal
          open={openModalInsert}
          onClose={handleModalInsert}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >

          <div style={modalStyle} className={classes.paper2}>
            <h3 id="simple-modal-title">Agregar nuevo Material</h3>
            <GridContainer >
              <GridItem xs={6} sm={6} md={6}>
              <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                  <TextField name='titulo'variant="outlined" required margin="normal" className={classes.inputMaterial} label="titulo"onChange={handleChangle} />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                  <TextField name='subtitulo'variant="outlined"  required margin="normal" className={classes.inputMaterial} label="subtitulo" onChange={handleChangle} />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                  <TextField name='tipo'variant="outlined"  required margin="normal" className={classes.inputMaterial} label="tipo" onChange={handleChangle} />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                  <TextField name='archivo'variant="outlined"  required margin="normal" className={classes.inputMaterial} label="archivo" onChange={handleChangle} />
                </GridItem>
              </GridContainer>

              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <article>
                  <ReactMarkdown>{"# "+consoleSeleccionada.titulo+"\n## "+consoleSeleccionada.subtitulo+"\n"+consoleSeleccionada.tipo+"\n"+consoleSeleccionada.archivo}</ReactMarkdown>
                </article>
                
              </GridItem>
            </GridContainer>
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalInsert} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={Insert} >Guardar</Button>
          </div>
        </Modal>





        <Modal
          open={openModalUpdate}
          onClose={handleModalUpdate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Editar Material</h3>
              <TextField name='idmaterial'variant="outlined" margin="normal" disabled={true} className={classes.inputMaterial} label="idmaterial"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.idmaterial}/>
            <br/>
            <TextField name='titulo'variant="outlined"  margin="normal"required className={classes.inputMaterial} label="titulo"onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.titulo}/>
            <br/>
            <TextField name='subtitulo'variant="outlined" margin="normal" required className={classes.inputMaterial} label="subtitulo" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.subtitulo}/>
            <br/>
            <TextField name='tipo'variant="outlined" margin="normal" required className={classes.inputMaterial} label="tipo" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.tipo}/>
            <br/>
            <TextField name='archivo'variant="outlined" margin="normal" required className={classes.inputMaterial} label="archivo" onChange={handleChangle} value={consoleSeleccionada && consoleSeleccionada.archivo}/>
            <br/>
            <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalUpdate} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={Update} >Guardar Cambios</Button>
          </div>
        </Modal>


        <Modal
          open={openModalDelete}
          onClose={handleModalDelete}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Eliminar...</h3>
            <h4>En realidad desea eliminar la noticia?</h4>
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" variant="outlined" color="primary" onClick={handleModalDelete} >Cancelar</Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" onClick={Eliminar} >Eliminar</Button>
          </div>
        </Modal>

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
