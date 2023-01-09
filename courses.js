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

function renderCourses (course) {
    let resultat = document.querySelector("resultat");
    let titleCourse = document.createElement("h3");
    let div  = document.createElement("div");
    div.classList.add("courseWrapper");

    titleCourse.innerText = course.title +  " (" + course.totalCredits + "credits)";
    resultat.appendeChild(titleCourse);
    resultat.appendChild(div);

    let hittadStudent = studentById(course);
    let headTeacher = getHeadTeacher(course);
    let teachers = getTeacher(course);

    let studentCourses = [];

    for (let student of hittadStudent) {
        for (let studentCourse of student.courses){
            if (studentCourse.courseId == course.courseId) {
                studentCourses.push(studentCourse);
            }
        }
    }

    for (let i = 0; i < hittadStudent.length; i ++) {
        let students = document.createElement("div");
        students.classList.add("students");

        div.appendChild("students");
        students.innertext = hittadStudent[i].firstname + " " + hittadStudent[i].lastname + "(" + studentCourses[i].passedCredits +" credits)"  + "\n" + "started: "+ studentCourses[i].started.semester + " " + studentCourses[i].started.year;


        if (studentCourses[i].passedCredits == course.totalCredits){
            students.style.backgroundColor = "Lime";
        }
    }

    let responDiv = document.createElement("div");
    responDiv.innerHTML = "Course Responsible: ";
    responDiv.classList.add("respon");
    div.appendChild(responDiv);

    for ( let i = 0; i < headTeacher.length; i ++) {
        let responT = document.createElement("p");
        responT.classList.add("responT");
        responDiv.appendChild(responT);
        responT.innerText = headTeacher[i].firstname + " " + headTeacher[i].lastname + "(" + headTeacher[i].post + ")";
    }

    let teacher = document.createElement("div");
    teacher.classList.add("teacher");
    div.appendChild(teacher);
    teacher.innertext = "Teachers: ";

    for(let i = 0; i < teachers.length; i ++) {
        let teacherA = document.createElement("p");
        teacher.appendChild(teacherA);
        teacherA.innerText = teachers[i].firstname + " " + teachers[i].lastname + " (" + teachers[i].post + ")";
        
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


