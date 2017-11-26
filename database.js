/****************************************************************************
	Title: Database Configuration for 'Tracking Workouts with MySQL'
	Author: Sean Hinds
	Date: 11/25/17
	Description: Database configuration file. Can be modified to connect to
					another database. This module is imported by app.js
****************************************************************************/

// Import the node.js mysql module

var mysql = require('mysql');


/****************************************************************************
	Define a request pool 
****************************************************************************/

var pool = mysql.createPool({

	connectionLimit: 10,

	// Database targeting and credentials

	host: 'us-cdbr-iron-east-05.cleardb.net',
	user: 'bea477a759dfeb',
	password: '008a20d7',
	database: 'heroku_2a08e460d696ab6'

});

// Define the exports of this module

module.exports.pool = pool;
