import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Container from "@material-ui/core/Container";
import {uploadImageContent, uploadVideoContent} from "../api/contentApi";

class UploadContentDialogBox extends Component {
    state = {
        open: false,
        file: null,
        caption: '',
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    }

    getFormFromState = () => {
        let formData = new FormData();
        formData.append('caption', this.state.caption);
        formData.append('file', this.state.file);
        return formData;
    };

    handleUpload = () => {
        this.handleToggle();
        (this.props.type === "image") ?
            this.props.uploadImageContentProp(this.getFormFromState()) :
            this.props.uploadVideoContentProp(this.getFormFromState());
    };

    handleChange = field => {
        this.setState({[field.target.name]: field.target.value});
    };

    handleFileUpload = field => {
        console.log(field.target.files[0]);
        this.setState({file: field.target.files[0]});
    };

    render() {
        return (
            <Container component="main" maxWidth="md">
                <Button variant="contained" color="default" startIcon={<CloudUploadIcon/>}
                        onClick={this.handleToggle}>Upload</Button>
                <Dialog open={this.state.open} onClose={this.handleToggle}>
                    <DialogTitle id="alert-dialog-title">UPLOAD new content</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form>
                                <Grid container spacing={1} alignContent="center">
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" margin="normal" required fullWidth id="caption"
                                                   label="Caption" name="caption" autoComplete="caption" autoFocus
                                                   onChange={this.handleChange} value={this.state.caption}/>
                                    </Grid>
                                    <Grid item xs={12} alignContent="center">
                                        {(this.props.type === "image") ?
                                            <input accept="image/*" id="contentUploader" type="file"
                                                   style={{display: 'none'}} onChange={this.handleFileUpload}/> :
                                            <input accept="video/mp4,video/x-m4v,video/*" id="contentUploader"
                                                   type="file" style={{display: 'none'}}
                                                   onChange={this.handleFileUpload}/>}
                                        <label htmlFor="contentUploader">
                                            <Button variant="contained" color="primary" component="span">Upload</Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {(this.state.file) ? <strong>{this.state.file.name}</strong> : ''}
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUpload} color="primary" autoFocus>Upload</Button>
                        <Button onClick={this.handleToggle} color="default">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {isAuthenticated} = state.user;
    return {isAuthenticated};
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadImageContentProp: (data) => uploadImageContent(dispatch, data),
        uploadVideoContentProp: (data) => uploadVideoContent(dispatch, data),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadContentDialogBox);
