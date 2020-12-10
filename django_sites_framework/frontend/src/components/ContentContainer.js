import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ContentList from "../components/ContentList";

const ContentContainer = (props) => {
    return (
        <React.Fragment>
            <Typography component="h3" variant="h3" align='center'>{props.type}</Typography>
            <hr/>
            <Container>
                {(props.populateContent) ?
                    <ContentList type={props.type} content={props.contentData}/> :
                    <Typography component="h6" variant="h6" align='center'>
                        Please check the flag above to Fetch Data
                    </Typography>}
            </Container>
        </React.Fragment>
    );
}

export default ContentContainer;
