require('dotenv').config();
const hana = require('@sap/hana-client');

const connection = hana.createConnection();

async function connectDB() {
    try {
        await connection.connect({
            serverNode: process.env.SQL_ENDPOINT,
            uid: process.env.SQL_USERNAME,
            pwd: process.env.SQL_PASSWORD,
            sslValidateCertificate: process.env.SQL_SSL === 'true'
        });
        console.log("Connected to SAP HANA!");
    } catch (error) {
        console.error("Connection Error:", error);
        process.exit(1);
    }
}

module.exports = { connection, connectDB };