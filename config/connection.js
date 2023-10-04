const { connect, connection } = require('mongoose')

const connectionString = process.env.MONGDB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB'

connect(connectionString)

module.exports = connection