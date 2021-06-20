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
import GestureIcon from '@material-ui/icons/Gesture';
import DeckIcon from '@material-ui/icons/Deck';
import RowingIcon from '@material-ui/icons/Rowing';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AppleIcon from '@material-ui/icons/Apple';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import FlipIcon from '@material-ui/icons/Flip';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import FiberDvrIcon from '@material-ui/icons/FiberDvr';
import {Link} from "react-router-dom"
import BrushIcon from '@material-ui/icons/Brush';
import AcUnitIcon from '@material-ui/icons/AcUnit';

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
                <Divider />
                <ListItem button key='Diagram' component={Link} to='/diagram'>
                    <ListItemIcon> <DeckIcon/> </ListItemIcon>
                    <ListItemText primary='Diagram' />
                </ListItem>
                <ListItem button key='Mock' component={Link} to='/mock'>
                    <ListItemIcon> <FilterVintageIcon/> </ListItemIcon>
                    <ListItemText primary='Mock' />
                </ListItem>
                <ListItem button key='Vhost' component={Link} to='/vhost'>
                    <ListItemIcon> <GestureIcon/> </ListItemIcon>
                    <ListItemText primary='Vhost' />
                </ListItem>
                <ListItem button key='Gohost' component={Link} to='/gohost'>
                    <ListItemIcon> <RowingIcon/> </ListItemIcon>
                    <ListItemText primary='Gohost' />
                </ListItem>
                <Divider />
                <ListItem button key='SvgTest' component={Link} to='/svgtest'>
                    <ListItemIcon> <RecordVoiceOverIcon /> </ListItemIcon>
                    <ListItemText primary='SvgTest' />
                </ListItem>
                <Divider />
                <ListItem button key='Diagraph' component={Link} to='/diagraph'>
                    <ListItemIcon> <AssessmentIcon /> </ListItemIcon>
                    <ListItemText primary='Diagraph' />
                </ListItem>
                <Divider />
                <ListItem button key='Viser' component={Link} to='/viser'>
                    <ListItemIcon> <AppleIcon /> </ListItemIcon>
                    <ListItemText primary='Viser' />
                </ListItem>
                <Divider />
                <ListItem button key='Visx' component={Link} to='/visx'>
                    <ListItemIcon> <EmojiSymbolsIcon /> </ListItemIcon>
                    <ListItemText primary='Visx' />
                </ListItem>
                <Divider />
                <ListItem button key='Treeviz' component={Link} to='/treeviz'>
                    <ListItemIcon> <FlipIcon /> </ListItemIcon>
                    <ListItemText primary='Treeviz' />
                </ListItem>
                <Divider />
                <ListItem button key='ReactFlow' component={Link} to='/reactflow'>
                    <ListItemIcon> <EmojiNatureIcon /> </ListItemIcon>
                    <ListItemText primary='ReactFlow' />
                </ListItem>
                <Divider />
                <ListItem button key='ReactDiagrams' component={Link} to='/reactdiagrams'>
                    <ListItemIcon> <FiberDvrIcon /> </ListItemIcon>
                    <ListItemText primary='ReactDiagrams' />
                </ListItem>
                <Divider />
                <ListItem button key='d3tree' component={Link} to='/d3view'>
                    <ListItemIcon> <BrushIcon /> </ListItemIcon>
                    <ListItemText primary='d3tree' />
                </ListItem>
                <Divider />
                <ListItem button key='d3effect' component={Link} to='/d3effect'>
                    <ListItemIcon> <AcUnitIcon /> </ListItemIcon>
                    <ListItemText primary='d3effect' />
                </ListItem>
            </List>
        </div>
    )
}