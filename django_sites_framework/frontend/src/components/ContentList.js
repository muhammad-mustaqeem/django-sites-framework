import React, {Component} from "react";
import Content from "./Content";


class ContentList extends Component {
    render() {
        return (
            <div>
                {this.props.content.map(item => <React.Fragment key={item.id}><Content type={this.props.type} content={item}/><hr/></React.Fragment>)}
            </div>
        )
    }
}

export default ContentList;
