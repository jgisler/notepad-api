/* jshint esversion: 6, node: true */
const AWS = require('aws-sdk');

exports.handler = handleEvent;

function handleEvent(event, context, callback) {

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Success"
        })
    };

    callback(null, response);

}