import React,{ Component } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, Typography  } from "@material-ui/core";
import Navbar from './Navbar';
class Header extends Component{
    
    render(){
        return(
          <div>
            <ThemeProvider >
                    <Navbar/>
                    <Button>
                        Button
                    </Button>
                    <Button variant="container" color="secondary">
                        BUtton
                    </Button>
                    <Typography variant="h1" >
                        Hol papasausssasasasasasasasasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        dsf
                        dsdsd
                        sd
                        sd
                        sd
                        sd
                        sd
                        s
                        ds
                        ddsds
                        sdsdsd
                        sdsds
                    </Typography>
                    
                </ThemeProvider>
          </div>
           
        );
    }
}
export default Header;