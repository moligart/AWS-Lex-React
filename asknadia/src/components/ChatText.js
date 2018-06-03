import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ChatText.css';

export default class ChatText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`text ${this.props.type}`}>
                <div className="avatar"/>
                <div className="message">
                    <p>{this.props.data.message}</p>
                </div>
            </div>
        );
    }
}
