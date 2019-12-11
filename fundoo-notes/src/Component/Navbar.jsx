import React from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import InputAdornment from '@material-ui/core/InputAdornment';
import Flogo from '../images/flogo.png'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginLeft: theme.spacing(-2),
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginLeft: theme.spacing(2),
        },
    },
    logo: {
        display: 'none',
        marginLeft: theme.spacing(-1),
        [theme.breakpoints.up('sm')]: {
            display: 'inline',
        },
    },
    search: {
        display: 'none',
        position: 'relative',
        borderRadius: '8px',
        maxWidth: '700px',
        backgroundColor: '#f1f3f4',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            
            marginLeft: theme.spacing(12),
            width: '100%',
            height: '49px',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    searchIcon: {
        marginLeft: theme.spacing(1),
        position: 'absolute',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    inputRoot: {
        color: 'black',
        marginTop: theme.spacing(1),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    list: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
           display: 'inline',
        },
    },
    searchicon: {
        display: 'inline',
        [theme.breakpoints.up('sm')]: {
           display: 'none',
        },
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    list1: {
        width: 250,
    },
    fullList: {
        width: 'auto',
        backgroundColor: 'lightred',
    },
    drawer:{
        '& .MuiDrawer-paper': {
            top: '4.1em',
        },
        '& .MuiPaper-elevation16':{
            boxShadow: 'none',
        },
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
        }
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [view, setView] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
  
    const handleToggle = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
    const handleClose = event => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    const renderMenu = (

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={handleClose}>Enable dark theme</MenuItem>
                    <MenuItem onClick={handleClose}>Send Feedback</MenuItem>
                    <MenuItem onClick={handleClose}>Help</MenuItem>
                    <MenuItem onClick={handleClose}>App downloads</MenuItem>
                    <MenuItem onClick={handleClose}>Keyboard shortcuts</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>)

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
        className={classes.list1}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
        >
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        </div>
    );

    

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer('left', true)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <img src={Flogo} width="55px" height="48px" className={classes.logo} />
                    <Typography className={classes.title} variant="h5"  noWrap>
                        <span style={{color: '#4285F4'}}>F</span>
                        <span style={{color: '#DB4437'}}>u</span>
                        <span style={{color: '#F4B400'}}>n</span>
                        <span style={{color: '#4285F4'}}>d</span>
                        <span style={{color: '#0F9D58'}}>o</span>
                        <span style={{color: '#DB4437'}}>o</span>
                    </Typography>
                    <div className={classes.search}>
                        <InputBase
                            placeholder="Search"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                    className={classes.searchIcon}
                                    aria-label="search icon"
                                    edge="start"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <div className={classes.grow} />
                        <div>
                            <IconButton className={classes.searchicon}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton onClick={ () => window.location.reload(false) }>
                                <RefreshIcon />
                            </IconButton>
                            <IconButton className={classes.list}
                                onClick={ ()=> setView(!view) }>
                                { view ? <DashboardOutlinedIcon /> : <ViewAgendaOutlinedIcon />}
                            </IconButton>
                            <IconButton
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}>
                                <SettingsOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <AccountCircle />
                            </IconButton>
                        </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Drawer open={state.left} onClose={toggleDrawer('left', false)} className={classes.drawer}>
                        {sideList('left')}
            </Drawer>
        </div>
    );
}
