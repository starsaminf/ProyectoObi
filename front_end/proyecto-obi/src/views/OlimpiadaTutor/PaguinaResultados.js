import React, { useEffect, useState,useCallback } from 'react';

import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';

// wiservise y coneecciones
import Cookies from "universal-cookie";
import HOST from "../../variables/general.js";
import axios from 'axios';

import { Alert, AlertTitle } from '@material-ui/lab';


const baseUrl_Grupos=HOST.Url_Tutor+'Grupo.php';
//"../../variables/general.js";
const cookies = new Cookies();
//componentes de exel

const header = HOST.header(cookies.get('token'));

function PaguinaResultados(props) {
    
    const [data,setData]=useState([]);

    //**      UPDATE  */
const getGrupoConNotas=useCallback(async()=>{
    //consoleSeleccionada.mensaje='';
    await axios.post(baseUrl_Grupos,{
        _metod: 'getGrupoConNotas',
        idNivel:        props.idnivel,     
        idEtapa:        props.idetapa
    },header
  ).then(
    response => {
        console.log(response);
        if(response.data.estado===1)
            setData(response.data.val);
        else
            setData([]);
      /*setConsolaSeleccionada(prevState=>({
        ...prevState,
        ['mensaje']:response.data.mensaje
      }))
      handleModalMensaje();*/
    }
  ).catch(
    error=>{
      alert(error+"");
      console.log(error);
    }
  )
},[props]);
const getGrupoConNotasCondicionado = useCallback(async()=>{
  //consoleSeleccionada.mensaje='';
  await axios.post(baseUrl_Grupos,{
    _metod: 'getGrupoConNotasCondicionado',
    idNivel:        props.idnivel,     
    idEtapa:        props.idetapa,
    idTutor:        cookies.get('idusuario')
  },header
  ).then(
  response => {
      console.log(response);
      if(response.data.estado===1)
          setData(response.data.val);
      else
          setData([]);
    /*setConsolaSeleccionada(prevState=>({
      ...prevState,
      ['mensaje']:response.data.mensaje
    }))
    handleModalMensaje();*/
  }
  ).catch(
  error=>{
    //alert(error+"");
    console.log(error);
  }
  )
},[props]);
    useEffect(()=>{
      if(props.tipo==='1'){
        getGrupoConNotas();  
      }else{
        console.log("Hacemos cambios papu");
        getGrupoConNotasCondicionado();
      }
      },[getGrupoConNotas,getGrupoConNotasCondicionado,props]);
    return (
    <div>

<TableContainer >
        {(data.length===0)?<center><Alert severity="error">Esta Etapa no tiene Grupos!</Alert></center>:
       <div>
          <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong><center>#</center></strong> </TableCell>
                        <TableCell><strong><center>puntos</center></strong> </TableCell>
                        <TableCell><strong><center>observaciones</center></strong> </TableCell>
                        <TableCell><strong><center>Grupo</center></strong> </TableCell>
                        <TableCell><strong><center>Colegio</center></strong> </TableCell>
                        <TableCell><strong><center>Estado</center></strong> </TableCell>
                        
                    </TableRow>
                </TableHead>
              <TableBody>
              {data.map(console =>(
                <TableRow key={console.idgrupo}>
                  
                    <TableCell><center>{console.row_number}</center></TableCell>
                    <TableCell><center>{console.puntos}</center></TableCell>
                    <TableCell><center>{console.observaciones}</center></TableCell>
                    <TableCell><center>{console.nombre}</center></TableCell>
                    <TableCell><center>{console.col}</center></TableCell>
                    <TableCell>
                        
                        {(console.estado==='Aprobado')?<Alert severity="success"><AlertTitle>{console.estado}</AlertTitle></Alert>:''}
                        {(console.estado==='Reprobado')?<Alert severity="error"><AlertTitle>{console.estado}</AlertTitle></Alert>:''}
                    
                    </TableCell>
                </TableRow>
                ))}
              </TableBody>
              
            </Table>

      
      </div>
      }
      </TableContainer>
    </div>
  );
}

export default PaguinaResultados;
