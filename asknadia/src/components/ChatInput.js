import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ChatInput.css';

import ChatService from '../services/chat-service';

const chat = new ChatService();

export default class ChatInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blockInput: false,
        };

        this.pushChat = this.pushChat.bind(this);
        this.setStateHelper = this.setStateHelper.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('click', this.handleClick);
    }

    setStateHelper = (state) => {
        this.setState(state);
    }

    handleKeyDown = (evt) => {
        switch (evt.keyCode) {
        case 13:
            this.handleEnter(evt);
            break;
        case 9:
            evt.preventDefault();
            break;
        default:
            break;
        }
    }

    handleEnter = (evt) => {
        if (!this.state.blockInput) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }

            const inputText = this.input.value;
            this.setStateHelper({ blockInput: true });

            if (inputText) {
                this.pushChat(inputText);
            } else {
                // Add a line complaining about empty input
                this.props.addRow([{
                    type: 'user',
                    data: {
                        message: 'You have to enter something for me to respond to it.',
                        messageFormat: 'PlainText',
                    },
                }]);

                this.setStateHelper({ blockInput: false });
            }
        }
    }

    handleClick = () => {
        this.input.focus();
    }

    pushChat = (inputText) => {
        chat.pushChat(inputText, this.props.uid)
            .then((data) => {
                this.props.addRow([{
                    type: 'bot',
                    data,
                }]);
            })
            .then(() => {
                this.setStateHelper({ blockInput: false });
            });
    }

    render() {
        return (
            <div className="inputContainer">
                <input
                    type="text"
                    ref={(input) => {
                        if (input) {
                            input.focus();
                        }
                        this.input = input;
                    }}
                    defaultValue="Enter text"
                />
            </div>
        );
    }
}

ChatInput.propTypes = {
    uid: PropTypes.string.isRequired,
    addRow: PropTypes.func.isRequired,
};
