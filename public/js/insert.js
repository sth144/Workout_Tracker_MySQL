/**********************************************************************************************
    Title: Insert Functionality
    Author: Sean Hinds  
    Date: 11/25/17
    Description: Insert functionality for 'Tracking Workouts with MySQL' app.
**********************************************************************************************/


// When the DOM content loads, bind the buttons

document.addEventListener("DOMContentLoaded", bindButtons);


/**********************************************************************************************
    bindButtons() adds onclick functionality to insertButton
**********************************************************************************************/

function bindButtons() {
    
    // Add event listener

    document.getElementById("insertButton").addEventListener("click", function(event) {

        // Store values from text fields

        var name = document.getElementById('name').value;
        var reps = document.getElementById('reps').value;
        var weight = document.getElementById('weight').value;
        var date = document.getElementById('date').value;
        var unit = document.getElementById('unit').value;

        // If the user entered a name

        if (name) {
            
            // Make an XMLHttpRequest to the /insert route on the server, passing variables
            //  stored above as query parameters to be stored in the database as a new row

            var request = new XMLHttpRequest(); 

            request.open("GET", "/insert?name=" + 
                name + 
                "&reps=" + reps +
                "&weight=" + weight +
                "&date=" + date + 
                "&unit=" + unit, true);
            
            // When the request loads

            request.addEventListener("load", function() {
                
                // if the request succeeds
                
                if (request.status >= 200 && request.status < 400) {
                    
                    // parse the response JSON
                    
                    console.log("success");

                    // Refresh the page

                    refreshPage();
                    refreshPage();

                }
                
                // if the request fails
                
                else {
                    
                    console.log("Error in network request: " + request.statusText);
                
                }
            });
            
            /* send the request after it loads, passing null as an argument,
                prevent default behavior (stops propagation) */
            
            request.send(null);
            event.preventDefault();
        }

        // Alert the user if they enter null for workout name

        else {

            alert("Please enter a workout name");
            event.preventDefault();

        }

    });

}