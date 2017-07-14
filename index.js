/* jshint esversion: 6, node: true */
const AWS = require('aws-sdk');

exports.handler = handleEvent;

function handleEvent(event, context, callback) {

    console.log(`event=${JSON.stringify(event, null, 2)}`);

    const resource = event.resource;
    const httpMethod = event.httpMethod.toLowerCase();

    switch (resource) {
        case "/note/{noteId}":
            switch (httpMethod) {
                case 'get':
                    callback(null, handleGet(event.pathParameters.noteId) );
                    break;
                default:
                    callback(buildResponse(501, {message: 'Not implemented'}));
            }
            break;
        default:
            callback(buildResponse(501, {message: 'Not implemented'}));
            break;
    }
}

function buildResponse(statusCode, responseBody) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(responseBody)
    }
}

function handleGet(noteId) {
    return buildResponse(200, {note: {noteId: noteId}});
}