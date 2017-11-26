/**********************************************************************************************
	Title: loadTable() function
	Author: Sean Hinds	
	Date: 11/25/17
	Description: loadTable() function for 'Tracking Workouts with MySQL' app.
**********************************************************************************************/


document.addEventListener("DOMContentLoaded", loadTable);


/**********************************************************************************************
	loadTable() called when DOM content is loaded. Calls refreshPage() to bind data in table to
		data in database
**********************************************************************************************/

function loadTable() {

    refreshPage();

}

