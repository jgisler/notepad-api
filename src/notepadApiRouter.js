/* jshint esversion: 6, node: true */
const AWS = require('aws-sdk');
const NoteService = require('./lib/NoteService');

function routeRequest(request, context, callback) {

    console.log(`request=${JSON.stringify(request, null, 2)}`);

    const resource = request.resource;
    const httpMethod = request.httpMethod.toLowerCase();

    switch (resource) {

        case "/notepad/note":
            switch (httpMethod) {
                case 'post':
                    createNote(request, callback);
                    break;
                default:
                    callback(buildResponse(501, {message: 'Not implemented'}));
            }
            break;

        case "/notepad/note/{noteId}":
            switch (httpMethod) {
                case 'get':
                    getNote(request, callback);
                    break;
                case 'put':
                    updateNote(request, callback);
                    break;
                case 'delete':
                    deleteNote(request, callback);
                    break;
                default:
                    callback(buildResponse(501, {message: 'Not implemented'}));
            }
            break;

        case "/notepad/notes":
            switch (httpMethod) {
                case 'get':
                    listNotes(request, callback);
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

/**
 * Handle request GET /notepad/note/{noteId}
 * @param {*} request
 * @param {*} callback
 */
function getNote(request, callback) {
    if (request && request.pathParameters && request.pathParameters.noteId) {
        const noteId = request.pathParameters.noteId;
        getNoteService().getNote(noteId).then((getNoteResult) => {

            if (getNoteResult && getNoteResult.Item) {
                callback(null, buildResponse(200, getNoteResult.Item));
            } else {
                callback(null, buildResponse(404, { error: `Note not found with ID ${noteId}` }));
            }

        }).catch((error) => {
            console.error(`[getNote] error=${JSON.stringify(error, null, 2)} stack=${error.stack}`);
            callback(null, buildResponse(500, { error: 'Internal service error' }));
        });

    } else {
        // This will most likely never happen because API Gateway will not map the resouce...
        callback(null, buildResponse(400, { error: 'Bad request; undefined noteId' }));
    }
}

function createNote(request, callback) {
    console.log(`[createNote] request=${JSON.stringify(request, null, 2)}`);
    callback(null,
        buildResponse(501, {
            error: 'Resource not implemented'
        })
    );
}

function updateNote(request, callback) {
    console.log(`[updateNote] request=${JSON.stringify(request, null, 2)}`);
    callback(null,
        buildResponse(501, {
            error: 'Resource not implemented'
        })
    );
}

function deleteNote(request, callback) {
    console.log(`[deleteNote] request=${JSON.stringify(request, null, 2)}`);
    callback(null,
        buildResponse(501, {
            error: 'Resource not implemented'
        })
    );
}

function listNotes(request, callback) {
    console.log(`[listNotes] request=${JSON.stringify(request, null, 2)}`);
    callback(null,
        buildResponse(501, {
            error: 'Resource not implemented'
        })
    );
}

function buildResponse(statusCode, responseBody) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(responseBody)
    };
}

function getNoteService() {
    return NoteService.getInstance(AWS);
}

exports.handler = routeRequest;