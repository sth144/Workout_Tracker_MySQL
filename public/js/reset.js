/**********************************************************************************************
    Title: Reset Table Functionality    
    Author: Sean Hinds
    Date: 11/26/17
    Description: Reset table functionality for the 'Tracking Workouts with MySQL app'
**********************************************************************************************/


// When the DOM loads, bind the buttons to their functionality

document.addEventListener("DOMContentLoaded", bindButtons);


/**********************************************************************************************
    bindButtons() called when DOM content is loaded
**********************************************************************************************/

function bindButtons() {
    
    // Add an onclick event listener

    document.getElementById("resetButton").addEventListener("click", function(event) {

        // For debugging

        console.log('resetclicked');

        // Open up a new XMLHttpRequest to server/reset-table which will delete all data in
        //  the table

        var reset = new XMLHttpRequest(); 

        reset.open("GET", "/reset-table", true);

        // For debugging

        console.log('hello');
        
        reset.addEventListener("load", function() {

            // For debugging

            console.log('HERE');

            // If the request succeeds then table has been reset by server
            
            if (reset.status >= 200 && reset.status < 400) {

                // Refresh the page
                
                refreshPage();
                refreshPage();

            }

            // If the request fails

            else {

                console.log('bad');

            }

        });

        // Send the request and prevent page from refreshing

        reset.send(null);      
        event.preventDefault();
  
    });
}