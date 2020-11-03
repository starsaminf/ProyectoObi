import React from 'react';
import {Button, Hidden, Typography, withWidth} from '@material-ui/core';
const Oculto =(props)=>{
    return (
        <div>
            <h1>Holaaa putillos</h1>
            <Typography variant="h6" color="initial">
                Ancho {props.width}
            </Typography>
            <Hidden xsDown>
                <Button variant="contained"  color="primary">
                    Xs
                </Button>
            </Hidden>
        </div>
    )
}

export default withWidth()(Oculto)