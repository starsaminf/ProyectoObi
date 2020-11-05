import React,{ Component,useEffect, useState} from "react";
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TexField, TextField} from '@material-ui/core';
import {Edit,Delete, Transform} from '@material-ui/icons';

const baseUrl='http://localhost:4000/proyectoOBI/back_end/Usuario.php';

class Prueba2 extends Component{
    state ={
        mensaje:'holaaaaa',
        form:{
            _metod:'Login',
            UserName:'',
            Password:''
        },
        data:[],
        modalInsertar:true,
        modalStilo:this.useState({
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
        })
    }
    useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
    iniciarSesion=async()=>{
        this.setState({mensaje:''});
        await axios.post(baseUrl,
            {
                _metod: 'getAll'
            },
            {
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json;charset=utf-8"
                }
            }
        )
        .then(
            response => {
                console.log(response);
                if(response.data.estado===1){
                    console.log(response.data.admin);
                    this.setState({data:response.data.admin});
                }else
                    this.setState({mensaje:response.data.mensaje});
            }
        )
        .catch(
            error=>{
                this.setState({contraseña:''});
                console.log(error);
            }
        )
    }
    componentDidMount = () => {
        this.iniciarSesion();
    }
    abrirCerrarModalInsertar = () =>{
        console.log("Click");
        this.setState({modalInsertar:!this.state.modalInsertar});
    }

    render(){
        return(
            <div>
                <Button type="sussess" onClick={this.abrirCerrarModalInsertar}>Insertar</Button>
               <TableContainer>
                   <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>nombre</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(console =>(
                                <TableRow key={console.idusuario}>
                                    <TableCell>Id</TableCell>
                                    <TableCell>{console.nombre}</TableCell>
                                    <TableCell>{console.correo}</TableCell>
                                    <TableCell>
                                        <Edit/>
                                        &nbsp;&nbsp;&nbsp;
                                        <Delete/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                   </Table>
               </TableContainer>
               <Modal
                open ={this.state.modalInsertar}
                onClose={this.abrirCerrarModalInsertar}
                >
                    <div style={this.state.modalStilo} className={this.useStyles.paper}>
                        <h3>Hola papus</h3>
                        <TextField label ="nombre"/>
                    </div>        
               </Modal>
            </div>
        );
    }
}
export default Prueba2;