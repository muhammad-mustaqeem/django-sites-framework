import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import CancelIcon from '@material-ui/icons/Cancel';
import {connect} from "react-redux";
import {deleteImageContent} from "../api/contentApi";

const ContentImage = styled.img`
max-width: 150px;
min-width: 150px;
max-height: 150px;
min-height: 150px;

`

class Content extends Component {
    handleDelete = () => {
        if (this.props.type === "image"){
            this.props.deleteImageProp(this.props.content.id)
        }else {
            console.log("VIDEO");
        }
    }
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} align='center'>
                    {(this.props.type === "image")?
                        <ContentImage src={this.props.content.file} alt={this.props.content.caption}/>:
                        <video width="150" height="150" controls><source src={this.props.content.file}/></video>
                    }
                </Grid>
                <Grid item xs={11} sm={11} md={7} lg={7} xl={7}>
                    <Typography component="h6" variant="h6">{this.props.content.caption}</Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <CancelIcon onClick={this.handleDelete}/>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch =>({
    deleteImageProp : (data) => deleteImageContent(dispatch, data),
})

export default connect(null,mapDispatchToProps)(Content);