import 'whatwg-fetch';

import { CHAT_ENDPOINT } from '../constants/constants';

const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
});

export default class ChatService {
    pushChat = (inputText, uid) => {
        return new Promise((resolve, reject) => {
            const payload = {
                inputText,
                uid,
            };

            fetch(CHAT_ENDPOINT, {
                method: 'POST',
                headers,
                body: this.buildPayload(payload),
            }).then((res) => {
                resolve(res.json());
            });
        });
    }

    buildPayload = (payload) => {
        return JSON.stringify(payload);
    }
}
