import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ChatWindow.css';

import ChatText from './ChatText';

export default class ChatWindow extends Component {
    constructor(props) {
        super(props);

        this.window = React.createRef();
    }

    componentDidUpdate() {;
        this.window.current.scrollTop = this.window.current.scrollHeight;
    }

    render() {
        return (
            <div
                ref={this.window}
                className="chatWindow"
            >
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

