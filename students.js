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

function renderStudents (student) {
    let resultat = document.querySelector("resultat");
    let studentNamn = document.createElement("h3");
    let div  = document.createElement("div");
    div.classList.add("studentWrapper");

    let studentCourse = findStudentCourse(student);
    let credits = studentCourse.reduce(function(a, b){return a + b}, 0);

    studentNamn.innerText = student.firstname +  " " + student.lastname + "(total credits: " + totalCredits + ")";
    resultat.appendeChild(studentNamn);
    resultat.appendChild(div);

    let course = courseById (student);

    for (let i = 0; i < course.length; i ++) {
        let kurserna = document.createElement("div");
        kurserna.classList.add("kurser");

        div.appendChild("kurserna");
        kurserna.innertext = course[i].title + "\n" + student.courses[i].startet.semester + " " + student.courses[i].started.year + " / " + student.courses[i].passedcredits + " of " + courses[i].totalCredits + "credits";
    }

}
