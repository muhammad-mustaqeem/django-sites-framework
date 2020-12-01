import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ContentList from "../components/ContentList";
import {connect} from "react-redux";
import {fetchImageContent, fetchVideoContent} from "../api/contentApi";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Navbar from "../components/Navbar";


class HomePage extends Component {
    state  = {
        images : false,
        videos: false,
    }
    componentDidMount()
    {
        this.props.fetchImagesProps();
        this.props.fetchVideosProps();
    }

    handleChange = field =>{
        console.log(field.target.checked)
        this.setState({...this.state, [field.target.name]: field.target.checked})
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Container component="main" maxWidth="lg">
                    <CssBaseline/>
                    <Grid container spacing={1} alignContent="center">
                        <Grid item xs={12} align="center">
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Switch checked={this.state.images} onChange={this.handleChange} name="images" color="primary"/>}
                                    label="Fetch Images"
                                />
                                <FormControlLabel
                                    control={<Switch checked={this.state.videos} onChange={this.handleChange} name="videos" color="primary"/>}
                                    label="Fetch Videos"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography component="h1" variant="h3" align='center'>Images</Typography>
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<CloudUploadIcon/>}
                            >
                                Upload Image
                            </Button>
                            <hr/>
                            <Container>
                            {(this.state.images)?<ContentList type="image" content={this.props.imageContent}/>:'Please check Image Flag to fetch Images'}
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography component="h1" variant="h3" align='center'>Videos</Typography>
                            <Button variant="contained" color="default" startIcon={<CloudUploadIcon/>}>
                                Upload Video
                            </Button>
                            <hr/>
                            <Container>
                            {(this.state.videos)?<ContentList type="video"  content={this.props.videoContent}/>:'Please check Video Flag to fetch Videos'}
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
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