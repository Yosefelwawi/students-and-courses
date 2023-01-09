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

// renderar studenter
function renderStudents (student) {
    let resultat = document.querySelector(".resultat");
    let div = document.createElement("div");
    let studentNamn = document.createElement("h2");
    div.classList.add("studentWrapper");

    div.innerHTML = "Courses:";

    let studentCourse = findStudentCourse(student);
    let credits = studentCourse.reduce(function(a, b){return a + b}, 0);

    studentNamn.innerText = student.firstName + " " + student.lastName + " (total credits: " + credits + ")";
    resultat.appendChild(studentNamn);
    resultat.appendChild(div);

    let course = courseById(student);


    for (let i = 0; i < course.length; i ++){
        let courses = document.createElement("div");
        courses.classList.add("courses");

        div.appendChild(courses);
        courses.innerText = course[i].title + "\n" + student.courses[i].started.semester + " " + student.courses[i].started.year + " / " 
        + student.courses[i].passedCredits + " of " + course[i].totalCredits + " credits";
        
        if (course[i].totalCredits == student.courses[i].passedCredits){
            courses.style.backgroundColor = "lime";
        }
    }
    
}

function skaparHTML (elev) {
    for (let student of elev) {
        renderStudents(student);
    }
}
function courseById(student) {
    let stCourses = [];

    for (let i = 0; i < student.courses.length; i ++) {
        stCourses.push(DATABASE.courses.find(course => {
            return course.courseId == student.courses[i].courseId; 
        }))
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
