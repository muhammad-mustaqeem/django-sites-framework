import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import CancelIcon from '@material-ui/icons/Cancel';
import {connect} from "react-redux";
import {deleteImageContent, deleteVideoContent} from "../api/contentApi";
import {baseUrl} from '../api/urls';

const ContentImage = styled.img`
max-width: 180px;
min-width: 180px;
max-height: 180px;
min-height: 180px;

`;

class Content extends Component {
    handleDelete = () => {
        if (this.props.type === "image") {
            this.props.deleteImageProp(this.props.content.id)
        } else {
            this.props.deleteVideoProp(this.props.content.id)
        }
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={5} xl={5} align='center'>
                    {(this.props.type === "image") ?
                        <ContentImage src={baseUrl + this.props.content.file} alt={this.props.content.caption}/> :
                        <video width="230" height="180" controls>
                            <source src={baseUrl + this.props.content.file}/>
                        </video>
                    }
                </Grid>
                <Grid item xs={11} sm={11} md={5} lg={6} xl={6}>
                    <Typography component="h6" variant="h6">{this.props.content.caption}</Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <CancelIcon onClick={this.handleDelete}/>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteImageProp: (data) => deleteImageContent(dispatch, data),
    deleteVideoProp: (data) => deleteVideoContent(dispatch, data),
})

export default connect(null, mapDispatchToProps)(Content);
