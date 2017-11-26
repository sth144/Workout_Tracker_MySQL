/**********************************************************************************************
    Title: Refresh Page Functionality   
    Author: Sean Hinds  
    Date: 11/26/17
    Description: refreshPage() and insertDummyData() functions for the 'Tracking Workouts with
                    MySQL' app. refreshPage() refreshes the page and insertDummyData() inserts
                    dummy data to demonstrate the functionality of the app without the user 
                    needing to manually enter 5 fields per row inserted.
**********************************************************************************************/


/**********************************************************************************************
    refreshPage()
**********************************************************************************************/

function refreshPage() {

    // Open up a new XMLHttpRequest() to the /refresh route

    var refresh = new XMLHttpRequest();

    refresh.open("GET", "/refresh", true);

    // When the request loads

    refresh.addEventListener("load", function() {

        // If the request succeeded

        if (refresh.status >= 200 && refresh.status < 400) {

            // For debugging

            console.log('client-refresh');

            //  Parse the response JSON object from server/refresh

            var responseObj = JSON.parse(refresh.responseText);
            var k = responseObj.length;

            // Point to the table

            tbody = document.getElementById('tab');

            // Clear the UI table to repopulate it

            while(tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            // Local variables

            var x;
            var y;
            var attributes = ['id', 'name', 'reps', 'weight', 'unit', 'date']
            var m = attributes.length;

            var responseItem;

            var buttons;
            var edit;
            var del;

            // Iterate through each object returned from the server and create a new row

            for (var i = 0; i < k; i++) {

                responseItem = responseObj[i];
                x = document.createElement('tr');

                // Iterate through each attribute of that object

                for (var j = 0; j < m; j++) {

                    // Create a new data element for the table and populate textContent

                    y = document.createElement('td');

                    // Truncate dates

                    if (attributes[j] == 'date') {

                        y.textContent = responseItem[attributes[j]].slice(0, 10)

                    }

                    // If attribute is not date
                    
                    else {

                        y.textContent = responseItem[attributes[j]];

                        // Hide id from the user

                        if (attributes[j] == 'id') {
                            y.classList.add("hidden");
                        }

                    }

                    // Append each data element to the new row

                    x.appendChild(y);

                }

                // Create a data element to display the edit and delete buttons for each row

                buttons = document.createElement('td');
                buttons.classList.add("buttons");

                // Create edit button and add onclick functionality

                edit = document.createElement('button');
                edit.innerHTML = "Edit";
                edit.onclick = function() {editRow('tab', this)};
                buttons.appendChild(edit);

                // Create delete button and add onclick functionality

                del = document.createElement('button');
                del.innerHTML = "Delete";
                del.onclick = function() {deleteRow('tab', this)};
                buttons.appendChild(del);

                // Append the buttons to the new row 

                x.appendChild(buttons);

                // Append the new row to the table

                tbody.appendChild(x);
                console.log('client-row-appended');

            }

        }

        // If the request failed

        else {

            console.log('bad');

        }

    });

    // Send the request and prevent page refresh

    refresh.send(null);
    event.preventDefault;

    // Populate dummy data in the form

    insertDummyData();

}


/**********************************************************************************************
    insertDummyData()
**********************************************************************************************/

function insertDummyData() {

    var attributes = ['names', 'reps', 'weights', 'dates', 'units'];

    // Options for each attribute. One value for each attribute will be randomly selected to 
    //    populate the insert form.

    var options = {
        names: [
        'Push-ups', 'Pull-ups', 'Sit-ups',
        'Crunches', 'Squats', 'Leg-lifts',
        'Bench Press', 'Calf-Raises', 'Lunges',
        'Bicep Curls', 'Tricep Curls', 'Military Press',
        'Chest Flies'
        ],
        reps: [
            6, 10, 12, 20,
            30, 50
        ],
        weights: [
            2.5, 5, 7.5, 10,
            12, 15, 20, 25,
            30, 35, 40, 50,
            75, 90, 140
        ],
        dates: [
            '2017-12-01',
            '2017-12-10',
            '2017-12-22',
            '2017-12-25',
            '2018-01-12',
            '2018-01-29'
        ],
        units: [
            'lbs', 'kg'
        ]
    }

    // Declare an array to hold the chosen index for each attribute

    var indices = [];

    // Select a random number for each attribute from 0 to the number of options for that 
    //  attribute

    for (var i = 0; i < attributes.length; i++) {

        indices[i] = Math.floor(Math.random() * options[attributes[i]].length);

    }

    // Populate data in the insert form

    var targets = ['name', 'reps', 'weight', 'date', 'unit'];

    for (var i = 0; i < targets.length; i++) {

        var target = document.getElementById(targets[i]);
        target.value = options[attributes[i]][indices[i]];

    }

}