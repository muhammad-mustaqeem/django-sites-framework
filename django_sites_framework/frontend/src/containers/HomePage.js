import React, {Component} from "react";
import {NavBar} from '../components/Navbar';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ContentList from "../components/ContentList";
import {connect} from "react-redux";
import {fetchImageContent} from "../api/contentApi";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class HomePage extends Component {
    state  = {
        images : false,
        videos: false,
    }
    componentDidMount()
    {
        this.props.fetchImagesProps();
    }

    handleChange = field =>{
        console.log(field.target.checked)
        this.setState({...this.state, [field.target.name]: field.target.checked})
    }

    render() {
        return (
            <div>
                <NavBar/>
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
                            <hr/>
                            <Container>
                            {(this.state.images)?<ContentList content={this.props.imageContent}/>:'Please check Image Flag to fetch Images'}
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography component="h1" variant="h3" align='center'>Videos</Typography>
                            <hr/>
                            <Container>
                            {(this.state.videos)?<ContentList content={this.props.videoContent}/>:'Please check Video Flag to fetch Videos'}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);