import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Gibberish from "./pages/gibberish";
import Empty from "./pages/empty";
import Laberisch from "./pages/laberisch";
import DrawerSidebar from "./fragments/drawerSidebar";
import DrawerHeader from "./fragments/drawerHeader";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import History from "./History";
import {
    createMuiTheme,
    ThemeProvider,
    Typography
} from "@material-ui/core";
import {
    BrightnessHigh,
    BrightnessLow,
} from "@material-ui/icons";
import ls from 'local-storage'
import DiagramTest from "./pages/diagram";
import MockDiagram from "./pages/mockDiagram";
import VhostDiagram from "./pages/vhostDiagram";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarBottom: {
        top: 'auto',
        alignItems: 'center',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    growToggle: {
        display: 'flex',
        float: 'right',
    },
}));

export default function DrawerApp() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [themeMode, setThemeMode] = React.useState('light');

    const theme = createMuiTheme({
        palette: {
            type: ls.get('colorTheme') || themeMode,
        },
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handeColorChange = () => {
      if (themeMode === 'light') {
          ls.set('colorTheme', 'dark')
          setThemeMode('dark')
      } else {
          ls.set('colorTheme', 'light')
          setThemeMode('light')
      }
    };

    useEffect(() => {
        const storedTheme = ls.get('colorTheme')
        if (storedTheme === 'dark') {
            setThemeMode('dark')
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <BrowserRouter history={History}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <DrawerHeader />
                            <div className={classes.grow}>
                                <div className={classes.growToggle}>
                                { themeMode === 'light' ?
                                    <IconButton color="inherit" component="span" onClick={handeColorChange}>
                                        <BrightnessLow />
                                    </IconButton>
                                    :
                                    <IconButton color="inherit" component="span" onClick={handeColorChange}>
                                        <BrightnessHigh />
                                    </IconButton>
                                }
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <DrawerSidebar />
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path="/gibberish" component={Gibberish} />
                            <Route exact path="/laberisch" component={Laberisch} />
                            <Route exact path="/diagram" render={() => <DiagramTest materialThemeName={themeMode}/>} />
                            <Route exact path="/mock" render={() => <MockDiagram materialThemeName={themeMode}/>} />
                            <Route exact path="/vhost" render={() => <VhostDiagram materialThemeName={themeMode}/>} />
                            <Route component={Empty} />
                        </Switch>
                    </main>
                    <AppBar position="fixed" color="default" className={classes.appBarBottom}>
                        <Typography variant="subtitle1" gutterBottom>
                            Hello there
                        </Typography>
                    </AppBar>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}
