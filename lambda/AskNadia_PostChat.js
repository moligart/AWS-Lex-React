const uuid = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});

exports.handler = (event, context, callback) => {
    
    const opts = {
        apiVersion: process.env.API_VERSION,
        endpoint: process.env.URL_HOST,
        accessKeyId: process.env.PUBLIC_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION
    };
    
    const lexRuntime = new AWS.LexRuntime(opts);
    
    const inputText = event.inputText;
    const userId = event.uid;
    
    const params = {
        botAlias: process.env.BOT_ALIAS,
        botName: process.env.BOT_NAME,
        inputText: inputText,
        userId: userId
    };
    
    lexRuntime.postText(params, (err, data) => {
        let respText, state, intent = ' ';
        let cb;
        
        if (data && data.message) {
            cb = data;
            respText = data.message;
            state = data.dialogState;
            intent = data.intentName === null ? ' ' : data.intentName;
        } else {
            cb = err;
        }
        
        const dynamo_opts = {
            apiVersion: process.env.DYNAMO_API_VERSION
        };
        
        const dynamodb = new AWS.DynamoDB(dynamo_opts);
    
        const item_params = {
            Item: {
                'id': {
                    S: uuid.v1()
                },
                'userId': {
                    S: userId
                },
                'input_text': {
                    S: inputText
                }, 
                'resp_text': {
                    S: respText
                },
                'state': {
                    S: state
                },
                'intent': {
                    S: intent
                },
                'created_date': {
                    S: new Date().toISOString()
                }
            }, 
            ReturnConsumedCapacity: 'TOTAL', 
            TableName: 'conversation_logs'
        };
        
        dynamodb.putItem(item_params, (err, data) => {
            if (err) {
                console.log(err, err.stack); 
            } else {
                console.log(data);
            }
        });
        
        callback(null, cb);
    });
    
};