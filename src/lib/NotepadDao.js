/* jshint esversion: 6, node: true */

/**
 * CRUD operations for the API
 */
class NotepadDao {

    constructor(dynamoClient, docClient) {
        this.dynamoClient = dynamoClient;
        this.docClient = docClient;
    }

    createTable() {
        console.log(`[NotepadDao::createTable] creating table...`);
        return this.dynamoClient.createTable({
            TableName: process.env.NOTES_TABLE,
            AttributeDefinitions: [{
                AttributeName: 'noteId',
                AttributeType: 'S'
            }],
            KeySchema: [{
                AttributeName: 'noteId',
                KeyType: 'HASH'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }).promise().catch((error) => {
            console.error(`[NotepadDao::createTable] error=${JSON.stringify(error, null, 2)}`);
            return error.message;
        });
    }

    saveNote(noteJson) {
        return this.docClient.put({
            TableName: process.env.NOTES_TABLE,
            Item: noteJson,
            ReturnValues: 'ALL_OLD'
        }).promise().then((result) => {
            console.log(`[NotepadDao::saveNote] result=${JSON.stringify(result, null, 2)}`);
            return result;
        }).catch((error) => {
            console.error(`[NotepadDao::saveNote] error=${JSON.stringify(error, null, 2)}`);
            return error;
        });
    }
}

module.exports = NotepadDao;