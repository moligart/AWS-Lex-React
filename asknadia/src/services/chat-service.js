import 'whatwg-fetch';

const endpoint = 'https://r1xu4fbkq7.execute-api.us-east-1.amazonaws.com/dev';

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

            fetch(endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
            }).then((res) => {
                resolve(res.json());
            });
        });
    }
}
