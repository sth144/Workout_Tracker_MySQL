/**************************************************************************************
    Title: deleteRow() Function Implementation
    Author: Sean Hinds
    Date: 11/25/17
    Description: deleteRow() function, implemented for the 'Tracking Workouts with
                    MySQL' app. Called by a click event listener on a delete button in
                    the table, this function deletes the data in that row both in the 
                    database (through an XMLHttpRequest to the server, which executes a
                    MySQL query to the database) and the UI (through client-side call 
                    to refresh()).
**************************************************************************************/


/**************************************************************************************
    deletRow() function implementation.
**************************************************************************************/

function deleteRow(tableID,currentRow) {

    // Declare a variable to store the id of the current row

	var id;

    // For debugging

    console.log('here');

    // Declare a variable to point to the table

    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    // Iterate through each row in the table

    for (var i = 0; i < rowCount; i++) {

        // Point to one row at a time

     	var row = table.rows[i];
        console.log('row ', row);
    
        // Check if that row is equal to current row
        
        if (row == currentRow.parentNode.parentNode) {

            // Do not let the user delete all data this way

            if (rowCount <= 1) {
                alert("Cannot delete all the rows.");
                break;
            }

            // This borrowed from SQL fiddle from assignment prompt on Canvas

            id = row.firstChild.innerHTML;
            console.log('id ', id);
            table.deleteRow(i);
            rowCount--;
            i--;

        }

    }

    // After deleting element from the UI, send an HTTP request to the server to
    //  instruct it to query the database and delete the row

    var delReq = new XMLHttpRequest();

    delReq.open('GET', '/delete?id=' + id, true);

    // When the request to /delete loads

    delReq.addEventListener('load', function() {

        // If the request succeeds

    	if (delReq.status >= 200 && delReq.status < 400) {

    		console.log('deleted');
    		refreshPage();
    		refreshPage();

    	}

        // If the request fails

    	else {

    		console.log('bad');

    	}

    });

    // Send the request and prevent the page from reloading

    delReq.send();
    event.stopPropagation();

}