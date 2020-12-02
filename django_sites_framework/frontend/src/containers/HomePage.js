import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {fetchImageContent, fetchVideoContent} from "../api/contentApi";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Navbar from "../components/Navbar";
import {Redirect} from "react-router-dom";
import ContentContainer from "../components/ContentContainer";

class HomePage extends Component {
    state = {
        images: false,
        videos: false,
    }

    handleChange = field => {
        this.setState({...this.state, [field.target.name]: field.target.checked})

        if (this.state.images){
            this.props.fetchImagesProps();
        }
        if (this.state.videos){
            this.props.fetchVideosProps();
        }
    }

    renderContent = () => {
        return (
            <React.Fragment>
                <Navbar/>
                <Container component="main" maxWidth="lg">
                    <CssBaseline/>
                    <Grid container spacing={1} alignContent="center">
                        <Grid item xs={12} align="center">
                            <FormGroup row centered>
                                <FormControlLabel
                                    control={<Switch checked={this.state.images} onChange={this.handleChange} name="images" color="primary"/>}
                                    label="Fetch Images"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    control={<Switch checked={this.state.videos} onChange={this.handleChange} name="videos" color="primary"/>}
                                    label="Fetch Videos"
                                    labelPlacement="top"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} alignContent="center" alignItems="center">
                            <ContentContainer type="image" populateContent={this.state.images} contentData={this.props.imageContent}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <ContentContainer type="video" populateContent={this.state.videos} contentData={this.props.videoContent}/>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }

    render() {
        if (this.props.isAuthenticated) {
            return this.renderContent();
        } else {
            return <Redirect to='/'/>;
        }
    }
}

const mapStateToProps = state => {
    const {isAuthenticated} = state.user;
    const {imageContent, videoContent} = state.content;
    return {isAuthenticated, imageContent, videoContent};
}

const mapDispatchToProps = dispatch => ({
    fetchImagesProps: () => fetchImageContent(dispatch),
    fetchVideosProps: () => fetchVideoContent(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
