'use strict';
const mongoose = require('mongoose');
const config = require('./config');
require('colors');

/**
 * Check initial configurations like db connection, log folder existance, etc...
 * @returns {Promise}
 */
var initialize = function () {
    console.log("initialize")
    return connectMegtraderDB()
};

var connectMegtraderDB = function () {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        });
        var MegtraderDB = mongoose.connection;

        MegtraderDB.once('connected', function connectionSuccess() {
            console.log('Megtrader Database Connection Establishement. '.bold.cyan + '[ ' + 'OK'.bold.green + ' ]');
            resolve();
        });

        MegtraderDB.once('reconnected', function connectionSuccess() {
            console.log('Megtrader Database Reconnection Establishement. '.bold.cyan + '[ ' + 'OK'.bold.green + ' ]');
            resolve();
        });

        MegtraderDB.on('disconnected', () => {
            console.log('Megtrader Database Disconnected'.bold.red);
        });

        MegtraderDB.on('error', function connectionError(err) {
            console.log('Megtrader Database Connection Establishement. '.bold.cyan + '[ ' + 'X'.bold.red + ' ]\n');
            console.log('Error connecting Megtrader Database.\nDetails: ' + err.toString().bold.red);
            process.exit(0);
        });
    });
};

process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            process.exit(0);
        });
});

module.exports.initialize = initialize;
