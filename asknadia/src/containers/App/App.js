import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './App.css';

import ChatInput from '../../components/ChatInput';
import ChatWindow from '../../components/ChatWindow';

import CookieService from '../../services/cookie-service';

const cookies = new CookieService();

class App extends Component {
    constructor() {
        super();

        this.state = {
            uid: null,
            rows: [{
                type: 'bot',
                data: {
                    message: 'I can tell you a joke, order pizza, or tell you about things. You can also just talk to me... What do you want to do?',
                    messageFormat: 'PlainText',
                },
            }],
        };

        this.init = this.init.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    setStateHelper = (obj) => {
        this.setState(obj);
    }

    init = () => {
        let uid = cookies.getCookie('uid');

        if (uid === '') {
            uid = uuid();
            cookies.setCookie('uid', uid);
        }

        this.setStateHelper({ uid });
    }

    addRow = (row) => {
        this.setStateHelper({ rows: this.state.rows.concat(row) });
    }

    render() {
        return (
            <div className="App">
                <header className="header">
                    <span className="headerText">AskNadia</span>
                    <div className="headerImage" />
                </header>
                <ChatWindow
                    rows={this.state.rows}
                />
                <ChatInput
                    uid={this.state.uid}
                    addRow={this.addRow}
                />
            </div>
        );
    }
}

export default App;
