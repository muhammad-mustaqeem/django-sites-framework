import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import {connect} from "react-redux";
import {Redirect, Link} from "react-router-dom";
import {registerUser} from "../api/userApi";
import Alert from "@material-ui/lab/Alert";

const CenteredDiv = styled.div`
margin-top: 10%;
`;

class RegistrationForm extends Component {
    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        usernameError: '',
        first_nameError: '',
        last_nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        serverSideErrors: '',
    }

    validate = () => {
        let isError = false;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (!RegExp('[a-zA-Z0-9]{5,20}').test(this.state.username)) {
            this.setState({usernameError: 'Username must be between 5 to 20 characters'});
            isError = true;
        }
        if (!RegExp('[a-zA-Z]{5,20}').test(this.state.first_name)) {
            this.setState({first_nameError: 'Name must be between 5 to 20 alphabets'});
            isError = true;
        }
        if (!RegExp('[a-zA-Z]{5,20}').test(this.state.last_name)) {
            this.setState({last_nameError: 'Name must be between 5 to 20 alphabets'});
            isError = true;
        }
        if (!RegExp('.{4,}@.{2,}.').test(this.state.email)) {
            this.setState({last_nameError: 'Name must be between 5 to 20 alphabets'});
            isError = true;
        }
        if (this.state.password.length < 8) {
            this.setState({passwordError: 'Password must have at least 8 characters'});
            isError = true;
        }
        if (this.state.password !== confirmPassword) {
            this.setState({confirmPasswordError: 'Password do not match'});
            isError = true;
        }
        return isError;
    }

    componentDidMount() {
        document.title = 'Register New User'
    }

    handleChange = field => {
        this.setState({
            [field.target.name]: field.target.value,
            usernameError: '',
            first_nameError: '',
            last_nameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            serverSideErrors: '',
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.validate()) {
            console.log('VALID INPUT RECEIVED');
            this.props.registerUserProp({
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
            });
        }
        this.setState({serverSideErrors: this.props.serverSideErrors});
    };

    user_registration_form = () => {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <CenteredDiv>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h3" align='center'>Sign up</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6} xl={6}>
                                <TextField variant="outlined" required fullWidth id="first_name" label="First Name"
                                           name="first_name" autoComplete="fname"
                                           inputProps={{pattern: "[a-z|A-Z]{8,}"}} value={this.state.first_name}
                                           onChange={this.handleChange} error={this.state.first_nameError}
                                           helperText={this.state.first_nameError}/>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6} xl={6}>
                                <TextField variant="outlined" required fullWidth id="last_name" label="Last Name"
                                           inputProps={{pattern: "[a-z|A-Z]{8,}"}} name="last_name" autoComplete="lname"
                                           value={this.state.last_name} error={this.state.last_nameError}
                                           helperText={this.state.last_nameError} onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="username" label="Username"
                                           inputProps={{pattern: "[a-z|A-Z|0-9]{8,}"}} name="username"
                                           autoComplete="username" value={this.state.username}
                                           error={this.state.usernameError} helperText={this.state.usernameError}
                                           onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="email" label="Email Address"
                                           name="email" autoComplete="email" value={this.state.email}
                                           error={this.state.emailError} helperText={this.state.emailError}
                                           onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="password" label="Password"
                                           inputProps={{pattern: "(.){8,}"}} type="password" id="password"
                                           value={this.state.password} error={this.state.passwordError}
                                           helperText={this.state.passwordError} onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="password2"
                                           inputProps={{pattern: "(.){8,}"}} label="Confirm Password" type="password"
                                           id="confirm-password" error={this.state.confirmPasswordError}
                                           helperText={this.state.confirmPasswordError}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary"
                                        onClick={this.handleSubmit}>Sign Up</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {(this.state.serverSideErrors) ?
                                    Object.keys(this.state.serverSideErrors).map(
                                        (error => <span><Alert severity="error">{error} : {this.props.serverSideErrors[error]}</Alert><br/></span>)
                                    ) : ""}
                            </Grid>
                            <Grid item xs={12}>
                                <span>Already have an account?<Link to="/">Sign in</Link></span>
                            </Grid>
                        </Grid>
                    </form>
                </CenteredDiv>
            </Container>
        );
    }

    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to='/home'/>);
        } else {
            return this.user_registration_form();
        }
    }
}

const mapStateToProps = state => {
    const {isAuthenticated, serverSideErrors} = state.user;
    return {isAuthenticated, serverSideErrors};
};

const mapDispatchToProps = (dispatch) => ({
    registerUserProp: (data) => registerUser(dispatch, data)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
