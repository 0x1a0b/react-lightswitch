import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import BathtubIcon from '@material-ui/icons/Bathtub';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import DeckIcon from '@material-ui/icons/Deck';
import {Link} from "react-router-dom"

export default function DrawerSidebar() {
    return (
        <div>
            <List>
                <ListItem button key='Home' component={Link} to='/'>
                    <ListItemIcon> <HomeIcon/> </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <Divider />
                <ListItem button key='Gibberish' component={Link} to='/gibberish'>
                    <ListItemIcon> <BathtubIcon/> </ListItemIcon>
                    <ListItemText primary='Gibberisch' />
                </ListItem>
                <ListItem button key='Laberisch' component={Link} to='/laberisch'>
                    <ListItemIcon> <ChildFriendlyIcon/> </ListItemIcon>
                    <ListItemText primary='Laberisch' />
                </ListItem>
                <ListItem button key='Diagram' component={Link} to='/diagram'>
                    <ListItemIcon> <DeckIcon/> </ListItemIcon>
                    <ListItemText primary='Diagram' />
                </ListItem>
                <ListItem button key='Mock' component={Link} to='/mock'>
                    <ListItemIcon> <FilterVintageIcon/> </ListItemIcon>
                    <ListItemText primary='Mock' />
                </ListItem>
            </List>
        </div>
    )
}