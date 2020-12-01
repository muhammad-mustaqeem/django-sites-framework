import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from "styled-components";
import {connect} from "react-redux";
import {Redirect, Link} from "react-router-dom";
import {loginUser} from "../api/userApi";

const CenteredDiv = styled.div`
margin-top: 10%;
`;

class LoginForm extends Component {
    state = {
        username: '',
        usernameError: '',
        passwordError: ''
    };

    validate = () => {
        let isError = false;
        const passwordField = document.getElementById('password').value;
        if (!RegExp('[a-zA-Z0-9]{4,}').test(this.state.username)) {
            this.setState({usernameError: 'Username must be an alphanumeric value having at least 5 characters'});
            isError = true;
        }
        if (!RegExp('.{4,}').test(passwordField)) {
            this.setState({passwordError: 'Password must have at least 5 characters'});
            isError = true;
        }
        return isError;
    }

    handleChange = field => {
        this.setState({[field.target.name]: field.target.value});
        if (this.state.usernameError || this.state.passwordError) {
            this.setState({usernameError: '', passwordError: ''});
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const passwordField = document.getElementById('password');
        if (!this.validate()) {
            this.props.loginUserProp({
                username: this.state.username,
                password: passwordField.value,
            });
        }
    };

    loginForm = () => {
        return (<Container component="main" maxWidth="sm">
            <CssBaseline/>
            <CenteredDiv>
                <form>
                    <Grid container spacing={1} alignContent="center">
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align='center'>Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" margin="normal" required fullWidth id="username"
                                       label="Username" name="username" autoComplete="username" autoFocus
                                       error={this.state.usernameError} helperText={this.state.usernameError}
                                       onChange={this.handleChange} value={this.state.username}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" margin="normal" required fullWidth name="password"
                                       label="Password" type="password" id="password" onChange={this.handleChange}
                                       error={this.state.passwordError} helperText={this.state.passwordError}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary"
                                    onClick={this.handleSubmit}>Sign In</Button>
                        </Grid>
                        <Grid item>
                            <span>Don't have an account? <Link to="/register/">Sign Up</Link></span>
                        </Grid>
                    </Grid>
                </form>
            </CenteredDiv>
        </Container>);
    }

    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to='/home'/>);
        } else {
            return this.loginForm();
        }
    }
}

const mapStateToProps = (state) => {
    const {isAuthenticated} = state.user;
    return {isAuthenticated};
}

const mapDispatchToProps = (dispatch) => ({
    loginUserProp: (data) => loginUser(dispatch, data),
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);