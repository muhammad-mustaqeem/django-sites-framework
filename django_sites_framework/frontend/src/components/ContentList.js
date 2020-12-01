import React, {Component} from "react";
import Content from "./Content";


class ContentList extends Component {
    render() {
        return (
            <div>
                {this.props.content.map(item => <div key={item.id}><Content content={item}/><hr/></div>)}
            </div>
        )
    }
}

export default ContentList;
