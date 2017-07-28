/* jshint esversion: 6, node: true */
const AWS = require('aws-sdk');

function handleRequest(request, context, callback) {

    const resource = request.resource;
    const httpMethod = request.httpMethod.toLowerCase();
    log("request", `${httpMethod} ${resource}`);

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

function log(name, value) {
    console.log(`${name}=${JSON.stringify(value, null, 2)}`);
}

exports.handler = handleEvent;