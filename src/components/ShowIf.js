import React, {Component} from 'react';

export default class ShowIf extends Component {
    render() {
        return this.props.predicate ? this.props.children : null;
    }
}
