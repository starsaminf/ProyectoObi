import React,{ Component } from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
}from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
class Listas extends Component{
    render(){
        return(
            <div>
                <List>
                {['Inicio'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['Facebook', 'Twiter', 'Instagram'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
                  <ListItem button >
                    <ListItemIcon><FacebookIcon /></ListItemIcon>
                    <ListItemText primary='Facebook' />
                  </ListItem>
                  <ListItem button >
                    <ListItemIcon><InstagramIcon /></ListItemIcon>
                    <ListItemText primary='Instagram' />
                  </ListItem>
              </List>
              
            </div>
        );
    }
}
export default Listas;