'use strict'

let searchbox = document.querySelector(".sok-namn");

function searchStudent () {
  let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(searchbox.value.toLowerCase()));

    // Bokstavsordning sortering a,b,c
    student.sort(function (a, b) {
        if (a.lastName > b.lastName) {
            return 1;
        } 
        if (a.lastName < b.lastName) {
            return -1;
        }
        return 0; 
    });

  return student;
}

// Eventlistner för vår searchbox
searchbox.addEventListener('keyup', function () {
  let findStudent = searchStudent();
  document.querySelector(".resultat").innerHTML = "";
  skaparHTML(findStudent);

  if (searchbox.value == ""){
    document.querySelector(".resultat").innerHTML = "";
  }
});

function renderStudents (student) {
    let resultat = document.querySelector("resultat");
    let studentNamn = document.createElement("h3");
    let div  = document.createElement("div");
    div.classList.add("studentWrapper");

    let studentCourse = findStudentCourse(student);
    let credits = studentCourse.reduce(function(a, b){return a + b}, 0);

    studentNamn.innerText = student.firstname +  " " + student.lastname + "(total credits: " + credits + ")";
    resultat.appendeChild(studentNamn);
    resultat.appendChild(div);

    let course = courseById (student);

    for (let i = 0; i < course.length; i ++) {
        let kurserna = document.createElement("div");
        kurserna.classList.add("kurser");

        div.appendChild("kurserna");
        kurserna.innertext = course[i].title + "\n" + student.courses[i].startet.semester + " " + student.courses[i].started.year + " / " + student.courses[i].passedcredits + " of " + course[i].totalCredits + "credits";

        if (course[i].totalCredits == student.courses[i].passedcredits){
            kurserna.style.backgroundColor = "Lime";
        }
    }

}

function skaparHTML (elev) {
    for (let student of elev) {
        renderStudents(student);
    }
}

function courseById (student) {
    let stCourses = [];

    for (let stCourses of student.courses) {
        for ( let courseDatabase of DATABASE.courses) {
            if (stCourses.courseId == courseDatabase.courseId) {
                stCourses.push(stCourses.passedcredits)
            }
        }
    }
    return stCourses;
}

function findStudentCourse (student) {
    
    let findStudentCourse = [];

    for (let studentCourse of student.courses) {
        for (let dbCourse of DATABASE.courses) {
            if (studentCourse.courseId == dbCourse.courseId) {
                findStudentCourse.push(studentCourse.passedCredits);
            }
        }
    }
    return findStudentCourse;
}
