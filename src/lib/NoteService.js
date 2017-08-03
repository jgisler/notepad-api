/* jshint esversion: 6, node: true */

const NOTES_TABLE = process.env.NOTES_TABLE;

let theInstance;

/**
 * Service methods for Notepad API
 */
class NoteService {

    static getInstance(AWS) {
        if (theInstance === undefined) {
            theInstance = new NoteService(new AWS.DynamoDB.DocumentClient());
        }
        return theInstance;
    }

    constructor(dynamoDocClient) {
        this.dynamoDocClient = dynamoDocClient;
    }

    getNote(noteId) {
        return this.dynamoDocClient.get({
            TableName: NOTES_TABLE,
            Key: {
                noteId: noteId
            }
        }).promise();
    }
}

module.exports = NoteService;