import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ChatWindow.css';

import ChatText from './ChatText';

export default class ChatWindow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chatwindow">
                {this.props.rows.map((item, index) => {
                    return (
                        <ChatText
                            type={item.type}
                            data={item.data}
                            row={item}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }
}

