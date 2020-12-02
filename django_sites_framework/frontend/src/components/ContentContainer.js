import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ContentList from "../components/ContentList";
import UploadContentDialogBox from "../components/UploadContentDialogBox";
import styled from "styled-components";

const CenteredDiv = styled.div`
text-align: center;
margin: 2%;
`;

const ContentContainer = (props) => {
    return (
        <React.Fragment>
            <Typography component="h1" variant="h3" align='center'>{props.type}</Typography>
            <CenteredDiv><UploadContentDialogBox type={props.type}/></CenteredDiv>
            <hr/>
            <Container>
                {(props.populateContent) ? <ContentList type={props.type} content={props.contentData}/> : 'Please check the flag above to Fetch Data'}
            </Container>
        </React.Fragment>
    );
}

export default ContentContainer;
