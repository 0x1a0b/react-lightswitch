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
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import ClassIcon from '@material-ui/icons/Class';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import VariablesGetCRAContextRoot from '../Variables';

const root = VariablesGetCRAContextRoot()

export default function DrawerSidebar() {
    return (
        <div>
            <List>
                <ListItem button key='Home' component={Link} to={root}>
                    <ListItemIcon> <HomeIcon/> </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <Divider />
                <ListItem button key='Gibberish' component={Link} to={root + 'gibberish'}>
                    <ListItemIcon> <BathtubIcon/> </ListItemIcon>
                    <ListItemText primary='Gibberisch' />
                </ListItem>
                <ListItem button key='Laberisch' component={Link} to={root + 'laberisch'}>
                    <ListItemIcon> <ChildFriendlyIcon/> </ListItemIcon>
                    <ListItemText primary='Laberisch' />
                </ListItem>
                <Divider />
                <ListItem button key='Diagram' component={Link} to={root + 'diagram'}>
                    <ListItemIcon> <DeckIcon/> </ListItemIcon>
                    <ListItemText primary='Diagram' />
                </ListItem>
                <ListItem button key='Mock' component={Link} to={root + 'mock'}>
                    <ListItemIcon> <FilterVintageIcon/> </ListItemIcon>
                    <ListItemText primary='Mock' />
                </ListItem>
                <ListItem button key='Vhost' component={Link} to={root + 'vhost'}>
                    <ListItemIcon> <GestureIcon/> </ListItemIcon>
                    <ListItemText primary='Vhost' />
                </ListItem>
                <ListItem button key='Gohost' component={Link} to={root + 'gohost'}>
                    <ListItemIcon> <RowingIcon/> </ListItemIcon>
                    <ListItemText primary='Gohost' />
                </ListItem>
                <Divider />
                <ListItem button key='SvgTest' component={Link} to={root + 'svgtest'}>
                    <ListItemIcon> <RecordVoiceOverIcon /> </ListItemIcon>
                    <ListItemText primary='SvgTest' />
                </ListItem>
                <Divider />
                <ListItem button key='Diagraph' component={Link} to={root + 'diagraph'}>
                    <ListItemIcon> <AssessmentIcon /> </ListItemIcon>
                    <ListItemText primary='Diagraph' />
                </ListItem>
                <Divider />
                <ListItem button key='Viser' component={Link} to={root + 'viser'}>
                    <ListItemIcon> <AppleIcon /> </ListItemIcon>
                    <ListItemText primary='Viser' />
                </ListItem>
                <Divider />
                <ListItem button key='Visx' component={Link} to={root + 'visx'}>
                    <ListItemIcon> <EmojiSymbolsIcon /> </ListItemIcon>
                    <ListItemText primary='Visx' />
                </ListItem>
                <Divider />
                <ListItem button key='Treeviz' component={Link} to={root + 'treeviz'}>
                    <ListItemIcon> <FlipIcon /> </ListItemIcon>
                    <ListItemText primary='Treeviz' />
                </ListItem>
                <Divider />
                <ListItem button key='ReactFlow' component={Link} to={root + 'reactflow'}>
                    <ListItemIcon> <EmojiNatureIcon /> </ListItemIcon>
                    <ListItemText primary='ReactFlow' />
                </ListItem>
                <Divider />
                <ListItem button key='ReactDiagrams' component={Link} to={root + 'reactdiagrams'}>
                    <ListItemIcon> <FiberDvrIcon /> </ListItemIcon>
                    <ListItemText primary='ReactDiagrams' />
                </ListItem>
                <Divider />
                <ListItem button key='d3tree' component={Link} to={root + 'd3view'}>
                    <ListItemIcon> <BrushIcon /> </ListItemIcon>
                    <ListItemText primary='d3tree' />
                </ListItem>
                <Divider />
                <ListItem button key='d3effect' component={Link} to={root + 'd3effect'}>
                    <ListItemIcon> <AcUnitIcon /> </ListItemIcon>
                    <ListItemText primary='d3effect' />
                </ListItem>
                <ListItem button key='d3expansion' component={Link} to={root + 'd3expansion'}>
                    <ListItemIcon> <BorderStyleIcon /> </ListItemIcon>
                    <ListItemText primary='d3expansion' />
                </ListItem>
                <Divider />
                <ListItem button key='g6test' component={Link} to={root + 'g6test'}>
                    <ListItemIcon> <ClassIcon /> </ListItemIcon>
                    <ListItemText primary='g6test' />
                </ListItem>
                <ListItem button key='g6static' component={Link} to={root + 'g6static'}>
                    <ListItemIcon> <BlurCircularIcon /> </ListItemIcon>
                    <ListItemText primary='g6static' />
                </ListItem>
                <ListItem button key='g6dynamic' component={Link} to={root + 'g6dynamic'}>
                    <ListItemIcon> <EditLocationIcon /> </ListItemIcon>
                    <ListItemText primary='g6dynamic' />
                </ListItem>
            </List>
        </div>
    )
}