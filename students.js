'use strict'

let searchStudent = document.querySelector("sok-namn");

// Eventlistner för vår searchbox

searchStudent.addEventListener('keyup', function () {
    let foundStudent = students ();

    document.querySelector("resultat").innerHTML = "";
    createHTML(foundStudent);

    if (searchStudent.value == "") {
        document.querySelector("resultat").innerHTML = "";
    }
    
});


