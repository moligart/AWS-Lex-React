function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
 
function dispatch(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const animal = slots.animal;
    const article = 'https://en.wikipedia.org/wiki/Cat';
    const _animal = animal.toLowerCase();
    const content = _animal === 'cat' || _animal === 'cats'
        ? `Good choice. Cats are the only animals that matter. Here is a sweet article: ${article}`
        : `${animal}? Nah. How about an article about cats instead? ${article}`;
    
    callback(
        close(
            sessionAttributes, 
            'Fulfilled', 
            {'contentType': 'PlainText', 'content': content}
        ));
}
 
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};