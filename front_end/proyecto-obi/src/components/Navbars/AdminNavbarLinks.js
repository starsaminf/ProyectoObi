import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Button from "../CustomButtons/Button.js";
import Cookies from "universal-cookie";
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);


const cookies = new Cookies();
export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const salir =()=>{
    cookies.remove('idusuario',{path:"/"});
    cookies.remove('username',{path:"/"});
    cookies.remove('correo',{path:"/"});
    cookies.remove('tipo',{path:"/"});
    cookies.remove('idolimpiada',{path:"/"});
    cookies.remove('token',{path:"/"});
    cookies.remove('fechalimiteedad',{path:"/"});
    window.location.href="../";
  }
  return (
    <div>
      
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
         
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Button color="danger" onClick={salir}>
        <Person className={classes.icons} />
          Salir
        </Button>
      </div>
    </div>
  );
}
