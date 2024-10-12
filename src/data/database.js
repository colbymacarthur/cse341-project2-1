const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db();
            callback(null, database);
        })
        .catch((err) => {
            callback(err, null);
        });
};

const getDb = () => {
    if (!database) {
        throw Error('Db not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDb
}