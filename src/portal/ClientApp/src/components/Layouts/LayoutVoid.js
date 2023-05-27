import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class LayoutVoid extends Component {
    static displayName = LayoutVoid.name;

    render() {
        return (
            <span>
            {this.props.children}
            </span>
    );
}
}

export default LayoutVoid;