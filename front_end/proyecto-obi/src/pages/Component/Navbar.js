import React from "react";
import { AppBar, Toolbar, Typography,  makeStyles, IconButton, Button, Modal} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme=>({    
    menuButton: {
        
    },
    title :{
        flexGrow: 1
    }
}))
const IniciarSesion = (e) =>{
        
    window.location.href="./iniciarsesion";
}
const CrearCuenta = (e) =>{
    
    window.location.href="./crearcuenta";
}
const Navbar = () =>{
    const classes = useStyles();
        return(
            <div>
                
                <Toolbar>
                    <IconButton 
                    color = "inherit" 
                    aria-label="menu" 
                    className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Olimpiada Boliviana de Informatica
                    </Typography>
                    <Hidden xsDown>
                        <Button variant="text" color ="inherit" onClick={IniciarSesion}>
                            Iniciar Sesion
                        </Button>
                        <Button variant="text" color ="inherit" onClick={CrearCuenta}>
                            Crear Cuenta
                        </Button>
                    </Hidden>
                    
                    
                </Toolbar>
                
                <Modal>

                </Modal>
                
            </div>
            
        );
    
}
export default Navbar;