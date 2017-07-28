/* jshint esversion: 6, node: true */
const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

const uuid  = require('uuid/v4');

process.env.NOTES_TABLE = 'notepad-api-NotesTable-31DYOQ4UXN1I';

const NotepadDao = require('./lib/NotepadDao');
const notepadDao = new NotepadDao(new AWS.DynamoDB(), new AWS.DynamoDB.DocumentClient());

function createTable() {
    notepadDao.createTable().then((result) => {
        console.log(`[createTable] result=${JSON.stringify(result, null, 2)} `);
    });
}

const noteId = "b281bb31-819f-42d0-be33-29dc24a0151d"; //uuid();
const noteJson = {
    "noteId": noteId,
    "title": "Title A and Stuff",
    "body": "Test note body. Blah blah",
    "attributes": {
        "attributeA": "valueA",
        "attributeC": "valueC",
    },
    tags: [ "tagA", "tagB", "tagC"]
};

notepadDao.saveNote(noteJson);



