import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    navColor: {
        backgroundColor: 'black',
    }
}));

const NavBar = ({user, isAuthenticated}) => {
    const classes = useStyles();
    console.log(isAuthenticated);
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Sites API
                    </Typography>
                    {(!isAuthenticated) ?
                        <div><Button color="inherit">Register</Button><Button color="inherit" href='/'>Login</Button></div> :
                        <div><Button color="inherit">Logout - {user.username}</Button></div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    const {user, isAuthenticated} = state.user;
    return {user, isAuthenticated};
}

export default connect(mapStateToProps, null)(NavBar);