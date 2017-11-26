/**********************************************************************************************
	Title: Edit Row Functions
	Author: Sean Hinds
	Date: 11/25/17
	Description: Functions which implement the edit row functionality of the 'Tracking 
					Workouts with MySQL' app. Called via a click event listener.
**********************************************************************************************/

/**********************************************************************************************
	editRow() calls insertEditForm, passing the row DOM element as a parameter.
**********************************************************************************************/

function editRow(tableID, currentRow) {
	
	// For debugging

	console.log('editing', tableID, currentRow);

	// Point to the table

	var table = document.getElementById(tableID);

	// Count rows in the table

	var rowCount = table.rows.length;

	// Iterate through each row

	for (var i = 0; i < rowCount; i++) {
		
		var row = table.rows[i];

		// Insert edit form in the row where the edit button was clicked

		if (row == currentRow.parentNode.parentNode) {
			insertEditForm(row);
		}
	}
}


/**********************************************************************************************
	insertEditForm() inserts the edit form into the DOM, replacing the row in the window
**********************************************************************************************/

function insertEditForm(row) {

	// Hide the current row to replace it in the interface

	row.style.display = "none";

	// Create the edit form

	var editForm = document.createElement('div');

	// Create input text boxes and submit button for user to input new 
	// 	column values

	var newName = document.createElement('input');
	newName.type = 'text';
	newName.classList.add('editInputs');
	newName.id = 'newName';
	newName.value = row.children[1].innerHTML;

	var newReps = document.createElement('input');
	newReps.type = 'text';
	newReps.classList.add('editInputs');
	newReps.id = 'newReps';
	newReps.value = row.children[2].innerHTML;

	var newWeight = document.createElement('input');
	newWeight.type = 'text';
	newWeight.classList.add('editInputs');
	newWeight.id = 'newWeight';
	newWeight.value = row.children[3].innerHTML;

	var newUnit = document.createElement('input');
	newUnit.type = 'text';
	newUnit.classList.add('editInputs');
	newUnit.id = 'newUnit';
	newUnit.value = row.children[4].innerHTML;

	var newDate = document.createElement('input');
	newDate.type = 'text';
	newDate.classList.add('editInputs');
	newDate.id = 'newWeight';
	newDate.value = row.children[5].innerHTML;

	var newSubmit = document.createElement('button');
	newSubmit.id = 'newSubmit';
	newSubmit.innerHTML = 'Update';
	newSubmit.onclick = function() {
		submitEditForm(
			row.firstChild.innerHTML, 
			newName.value,
			newReps.value,
			newWeight.value,
			newDate.value,
			newUnit.value
		); 
		event.stopPropagation();
	}

	var namePrompt = document.createElement('span');
	namePrompt.innerHTML = row.firstChild.innerHTML + '<br> Name<br>';
	var repsPrompt = document.createElement('span');
	repsPrompt.innerHTML = 'Reps<br>';
	var weightPrompt = document.createElement('span');
	weightPrompt.innerHTML = 'Weight<br>';
	var datePrompt = document.createElement('span');
	datePrompt.innerHTML = 'Date<br>';
	var unitPrompt = document.createElement('span');
	unitPrompt.innerHTML = 'Unit<br>';


	editForm.appendChild(namePrompt);
	editForm.appendChild(newName);
	editForm.appendChild(document.createElement('br'));
	editForm.appendChild(repsPrompt);
	editForm.appendChild(newReps);
	editForm.appendChild(document.createElement('br'));
	editForm.appendChild(weightPrompt);
	editForm.appendChild(newWeight);
	editForm.appendChild(document.createElement('br'));
	editForm.appendChild(unitPrompt);
	editForm.appendChild(newUnit);
	editForm.appendChild(document.createElement('br'));
	editForm.appendChild(datePrompt);
	editForm.appendChild(newDate);
	editForm.appendChild(document.createElement('br'));
	editForm.appendChild(newSubmit);

	row.parentNode.insertBefore(editForm, row);	
}


/**********************************************************************************************
	submitEditForm() is called by an event listener in the edit form. Submits data to the 
		server, which queries the database to update the data.
**********************************************************************************************/

function submitEditForm(id, name, reps, weight, date, unit) {
	console.log('submitting edits ' + 
		id + name + reps + weight + date + unit);

	var update = new XMLHttpRequest();

	update.open(
		'GET', '/safe-update?id=' + id +
		'&name=' + name +
		'&reps=' + reps +
		'&weight=' + weight +
		'&date=' + date +
		'&unit=' + unit,
		true
	);

	update.addEventListener('load', function() {

		if (update.status >= 200 && update.status < 400) {

			// For debugging

			console.log('safe update client ' + id);
		}
		else {

			// For debugging

			console.log('bad');
		}

	});
	update.send(null);
	event.stopPropagation();

	refreshPage();
	refreshPage();

}