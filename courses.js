'use strict'

let searchBox = document.querySelector("sok-kurs");

function findCourse () {
  let course = DATABASE.courses
    .filter((course) => course.title.toLowerCase().includes(searchBox.value));
// sortera efter kurs a,b,c
    course.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        } 
        if (a.title < b.title) {
            return -1;
        }
        return 0; 
    });
    return course; 
}
// Eventlistner för vår searchbox
searchBox.addEventListener("keyup", function(){
    let foundCourse = findCourse ();
    document.querySelector(".resultat").innerHTML = "";
    skaparHTML(foundCourse);

    if (searchBox.value == ""){
        document.querySelector(".resultat").innerHTML = "";
    }
});

function renderCourse (course) {
    let resultat = document.querySelector(".resultat");
    let div = document.createElement("div");
    let titleCourse = document.createElement("h2");
    div.classList.add("studentWrapper");

    titleCourse.innerText = course.title + " (" + course.totalCredits + " credits)";
    resultat.appendChild(titleCourse);
    resultat.appendChild(div);
// kurs lärare 
    let hittadStudent = studentsById(course);
    let headTeacher = repsonTeacher(course);
    let everyTeacher = teachers(course);
    let stCourses = [];
    
    for (let student of hittadStudent){
        for (let studentCourse of student.courses){
            if (studentCourse.courseId == course.courseId){
                stCourses.push(studentCourse);
            }
        }
    }

    for (let i = 0; i < hittadStudent.length; i ++){
        let students = document.createElement("div");
        students.classList.add("students");

        div.appendChild(students);
        students.innerText = hittadStudent[i].firstName + " " + hittadStudent[i].lastName + " (" + stCourses[i].passedCredits +" credits)" + "\n" + "Started: "+ stCourses[i].started.semester + " " + stCourses[i].started.year; 
        
        if (stCourses[i].passedCredits == course.totalCredits){
            students.style.backgroundColor = "lime";
        }
    }

    let responDiv = document.createElement("div"); 
    responDiv.innerHTML = "Course responsible: ";
    responDiv.classList.add("respon");
    div.appendChild(responDiv);


    for (let i = 0; i < headTeacher.length; i++) {
        let responsible = document.createElement("p");
        responsible.classList.add("responsible");
        responDiv.appendChild(responsible); 
        responsible.innerText = headTeacher[i].firstName + " " + headTeacher[i].lastName + " (" + headTeacher[i].post + ")";
    }

    let teacherN = document.createElement("div");
    teacherN.classList.add("teacherN");
    div.appendChild(teacherN);
    teacherN.innerText = "Teachers: ";

    for(let i = 0; i < everyTeacher.length; i++){
        let teacherA = document.createElement("p");
        teacherN.appendChild(teacherA); 
        teacherA.innerText =  everyTeacher[i].firstName + " " + everyTeacher[i].lastName + " (" + everyTeacher[i].post + ")";
    }
}


function skaparHTML (kurser) {
    for (let course of kurser) {
        renderStudents(course);
    }
}

//hittar rätt ID för rätt student
function studentById (course) {
    let fStudents = [];

    for (let student of DATABASE.students) {
        for (let sCourse of student.courses) {
            if (sCourse.couseId == course.courseId) {
                fStudents.push(student);
            }
        }
    }
    return fStudents;
}

// Hittar rätt lärare

function responTeacher (course) {
    let responTeacher = [];

    for (let teacher of DATABASE.teachers) {
        if (teacher.teacherId == course.courseResponsible) {
            responTeacher.push(teacher);
        }
    }
    return responTeacher;
}

function allTeachers (course) {
    let allTeachers = [];
    for ( let teacher of DATABASE.teachers) {
        for (let singleTeacher of course.teachers) 
            if (teacher.teacherId == singleTeacher){
                allTeachers.push(teacher);
            }
    }

    return allTeachers;
}

// bokstavsordning


