/******************************************************************************************************************
  Title: Node Index for 'Tracking Workouts with MySQL' App
  Author: Sean Hinds  
  Date: 11/25/17
  Description: Node.js app index for workout tracker. This index allows the UI to interact to a MySQL database  
                through queries, updates, and deletes. The user may also reset the table or create a new table.
                The application is used to track workouts by name, reps, weight, unit, and date. The app generates
                dummy data within the data insertion form to demonstrate database functionality.
******************************************************************************************************************/


/******************************************************************************************************************
  Module imports. App definition (express with handlebars)
******************************************************************************************************************/

var mysql = require('./database.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');


/******************************************************************************************************************
  App configuration
******************************************************************************************************************/

// Set up bodyparser middleware

app.use(bodyParser.urlencoded({extended: false}));

// Define a static file directory for express to search

app.use(express.static(__dirname + '/public'));

// Define a view engine and port

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8648);


/******************************************************************************************************************
  App routing
******************************************************************************************************************/

/******************************************************************************************************************
  Default route renders table
******************************************************************************************************************/

app.get('/', function(req,res,next) {

  // Define context for local scope

  var context = {};

  // Query the database

  mysql.pool.query('SELECT * FROM exercises', function(err, rows, fields) {

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Process data and render table

    context.results = JSON.stringify(rows);
    res.render('table', context);

  });

});


/******************************************************************************************************************
  Refresh route refreshes the table to reflect the current state of the database 
******************************************************************************************************************/

app.get('/refresh', function(req,res,next) {

  // Define context for the local scope
  
  var context = {};

  // Query the database

  mysql.pool.query('SELECT * FROM exercises', function(err, rows, fields) {

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Process data and render table

    context.results = JSON.stringify(rows);
    console.log('sending refresh');
    res.send(context.results);

  });

});


/******************************************************************************************************************
  Reset route deletes all data in the table
******************************************************************************************************************/

app.get('/reset-table', function(req, res, next) {

  // Define context for the local scope

	var context = {};

  // Query the database

	mysql.pool.query("TRUNCATE exercises", function(err) {
		console.log('server reset');
	});

  // Return response to the client

	res.send();

});


/******************************************************************************************************************
  Create route drops current table and creates a new one
******************************************************************************************************************/

app.get('/create-table', function(req, res, next) {
	
  // For debugging

	console.log('request received');

  // Define context for the local scope

	var context = {};

  // Query the database

	mysql.pool.query("DROP TABLE IF EXISTS exercises", function(err) {

    // Define a variable and set it to store the query string

		var createString = "CREATE TABLE exercises(" + 
			"id INT PRIMARY KEY AUTO_INCREMENT," + 
			"name VARCHAR(255) NOT NULL," + 
			"reps INT DEFAULT 10," + 
			"weight INT DEFAULT 50," + 
			"date DATE DEFAULT '1999-09-09'," + 
			"unit VARCHAR(255) DEFAULT 'kg')";

    // Query the database

		mysql.pool.query(createString, function(err) {

      // Process data and render table

			console.log('in3')
			context.results = "Table reset";
			console.log("Table reset");
			res.send(context.results);

		});

	});

});


/******************************************************************************************************************
  Insert route inserts new row with values specified in the query. Could be modified to POST
******************************************************************************************************************/

app.get('/insert',function(req,res,next) {

  // Define context for the local scope

  var context = {};
  console.log('inserting');

  // Parse values from the query

  var values = [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.unit];
  console.log("values ", values);

  // Query the database

  mysql.pool.query("INSERT INTO exercises (name, reps, weight, date, unit) VALUES (?, ?, ?, ?, ?)", 
  	values, function(err, result) {

    // For debugging

  	console.log(req.query);

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Process data and render table

    context.results = "Inserted id " + result.insertId;
    console.log(context.results);

  });

  // Return Response to the client

  res.send();

});


/******************************************************************************************************************
  Safe update route updates a row in the table
******************************************************************************************************************/

app.get('/safe-update',function(req,res,next) {

  // Define context for the local scope

	console.log('safe update server');
  var context = {};

  // Query the database

  mysql.pool.query("SELECT * FROM exercises WHERE id=?", [req.query.id], function(err, result) {

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Only query with one id parameter

    if(result.length == 1) {

      // Declare a variable to store the id of the row being altered

      var curVals = result[0];

      // Query the database

      mysql.pool.query("UPDATE exercises SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, 
        req.query.date || curVals.date, req.query.unit || curVals.unit, req.query.id],
        function(err, result){

        // Error handling

        if(err){
          next(err);
          return;
        }

        // Process data and render table

        context.results = "Updated " + result.changedRows + " rows.";
        console.log(context.results);

      });

    }

  });

  // Return response to the client

  res.send();

});


/******************************************************************************************************************
  Delete route deletes row from table as specified by query parameters. This is implemented 
    through a button in the UI
******************************************************************************************************************/

app.get('/delete', function(req, res, next) {

  // Define context for the local scope

	var context = {};

  // Query the database

	mysql.pool.query("DELETE FROM exercises WHERE id=?", [req.query.id], function(err, result) {

		console.log('DELETING');

    // Error handling

		if (err) {
			next(err);
			return;
		}

    // Return response to the client

		res.send();

	});

});


/******************************************************************************************************************
  Server-side notification that the app is running
******************************************************************************************************************/

app.listen(app.get('port') || process.env.PORT, function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
