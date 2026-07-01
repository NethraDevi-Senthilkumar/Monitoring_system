function addStudent() {

    let id = prompt("Enter Student ID:");
    let name = prompt("Enter Student Name:");
    let batch = prompt("Enter Batch Name:");

    if(id && name && batch){

        let table = document.getElementById("studentTable");

        let row = table.insertRow(-1);

        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = batch;
        row.insertCell(3).innerHTML =
            "<button>Edit</button> <button>Delete</button>";

        alert("Student Added Successfully!");
    }
}
function displayStudents(){

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    let table =
        document.getElementById("studentTable");

    while(table.rows.length > 1){
        table.deleteRow(1);
    }

    students.forEach(function(student){

        let row = table.insertRow();

        row.insertCell(0).innerHTML = student.id;
        row.insertCell(1).innerHTML = student.name;
        row.insertCell(2).innerHTML = student.batch;
        row.insertCell(3).innerHTML =
            "<button>Edit</button> <button>Delete</button>";

    });
}

function addTrainer() {
    alert("Trainer Added Successfully!");
}

function generateReport() {
    alert("Report Generated Successfully!");
}
function searchStudent() {
    let input = document.getElementById("studentSearch").value;
    
    if(input === "") {
        alert("Please enter a student name");
    } else {
        alert("Searching for: " + input);
    }
}
let dt = document.getElementById("dateTime");

if(dt){
    dt.innerHTML = new Date().toLocaleString();
}

let loginDt = document.getElementById("loginDateTime");

if(loginDt){
    loginDt.innerHTML = new Date().toLocaleString();
}
function searchBatch() {
    let input = document.getElementById("studentBatch").value;
    
    if(input === "") {
        alert("Please enter a batch number");
    } else {
        alert("Searching for: " + input);
    }
}
function searchTrainer() {
    let input = document.getElementById("studentTrainer").value;
    
    if(input === "") {
        alert("Please enter a trainer name");
    } else {
        alert("Searching for: " + input);
    }
}
function searchAttendance() {
    let input = document.getElementById("studentAttendance").value;
    
    if(input === "") {
        alert("Please enter an attendance count");
    } else {
        alert("Searching for: " + input);
    }
}
document.getElementById("loginDateTime").innerHTML =
new Date().toLocaleString();
function deleteStudent(button){
    let row=button.parentNode.parentNode;
    row.remove();

    alert("Student Deleted Successfully!");
}
function editStudent(button){
    let row=button.parentNode.parentNode;
    let currentName=row.cells[1].innerHTML;
    let newName=prompt("Enter New Student Name:",currentName);
    if(newName){
        row.cells[1].innerHTML=newName;

        alert("Student Updated Successfully!");
    }
    
}
function editTrainer(btn) {
    let row = btn.parentNode.parentNode;

    let newName = prompt("Enter new trainer name:");

    if(newName) {
        row.cells[1].innerHTML = newName;
    }
}

function deleteTrainer(btn) {
    if(confirm("Delete this trainer?")) {
        let row = btn.parentNode.parentNode;
        row.remove();
    }
}
function editBatchRow(button) {

    let row = button.parentNode.parentNode;

    let currentBatch = row.cells[1].innerHTML;

    let newBatch = prompt(
        "Enter New Batch Name:",
        currentBatch
    );

    if(newBatch){
        row.cells[1].innerHTML = newBatch;

        alert("Batch Updated Successfully!");
    }
}function deleteBatchRow(button) {

    if(confirm("Are you sure you want to delete this batch?")){

        let row = button.parentNode.parentNode;

        row.remove();

        alert("Batch Deleted Successfully!");
    }
}
function addSession() {
    alert("Session Added Successfully!");
}

function editSession() {
    alert("Session Edited Successfully!");
}

function deleteSession() {
    alert("Session Deleted Successfully!");
}
function addSession() {

    let id = prompt("Enter Session ID:");
    let sessionName = prompt("Enter Session Name:");
    let trainer = prompt("Enter Trainer Name:");
    let date = prompt("Enter Session Date:");

    if(id && sessionName && trainer && date){

        let table = document.getElementById("sessionTable");

        let row = table.insertRow(-1);

        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = sessionName;
        row.insertCell(2).innerHTML = trainer;
        row.insertCell(3).innerHTML = date;
        row.insertCell(4).innerHTML =
            '<button onclick="editSessionRow(this)">Edit</button> ' +
            '<button onclick="deleteSessionRow(this)">Delete</button>';

        alert("Session Added Successfully!");
    }
}
function editSessionRow(button){

    let row = button.parentNode.parentNode;

    let currentSession = row.cells[1].innerHTML;

    let newSession = prompt(
        "Enter New Session Name:",
        currentSession
    );

    if(newSession){
        row.cells[1].innerHTML = newSession;
    }
}
function deleteSessionRow(button){

    if(confirm("Delete this session?")){

        let row = button.parentNode.parentNode;

        row.remove();
    }
}
function addTrainer() {

    let id = prompt("Enter trainer ID:");
    let name = prompt("Enter trainer  Name:");
    let subject = prompt("Enter subject Name:");

    if(id && name && subject){

        let table = document.getElementById("studentTrainer");

        let row = table.insertRow(-1);

        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = subject;
        row.insertCell(3).innerHTML =
            "<button>Edit</button> <button>Delete</button>";

        alert("Trainer Added Successfully!");
    }
}
function displayTrainer(){

    let trainer =
        JSON.parse(localStorage.getItem("trainer")) || [];

    let table =
        document.getElementById("studentTrainer");

    while(table.rows.length > 1){
        table.deleteRow(1);
    }

    students.forEach(function(trainer){

        let row = table.insertRow();

        row.insertCell(0).innerHTML = trainer.id;
        row.insertCell(1).innerHTML = trainer.name;
        row.insertCell(2).innerHTML = trainer.batch;
        row.insertCell(3).innerHTML =
            "<button>Edit</button> <button>Delete</button>";

    });
}
function editTrainerRow(button){

    let row = button.parentNode.parentNode;

    let currentTrainer = row.cells[1].innerHTML;

    let newTrainer = prompt(
        "Enter New Trainer Name:",
        currentTrainer
    );

    if(newTrainer){
        row.cells[1].innerHTML = newTrainer;
    }
}
function deleteTrainerRow(button){

    if(confirm("Delete this trainer?")){

        let row = button.parentNode.parentNode;

        row.remove();
    }
}
function addBatch() {

    let id = prompt("Enter Batch ID:");
    let name = prompt("Enter Batch Name:");
    let trainer = prompt("Enter Trainer Name:");
    let student = prompt("Enter Number of Students:");

    if (id && name && trainer && student) {

        let table = document.getElementById("studentBatch");

        let row = table.insertRow(-1);

        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = trainer;
        row.insertCell(3).innerHTML = student;
        row.insertCell(4).innerHTML =
            '<button onclick="editBatchRow(this)">Edit Batch</button> ' +
            '<button onclick="deleteBatchRow(this)">Delete Batch</button>';

        alert("Batch Added Successfully!");
    }
}
function displayBatch() {

    let batches =
        JSON.parse(localStorage.getItem("batch")) || [];

    let table =
        document.getElementById("studentBatch");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    batches.forEach(function(batch) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML = batch.id;
        row.insertCell(1).innerHTML = batch.name;
        row.insertCell(2).innerHTML = batch.trainer;
        row.insertCell(3).innerHTML = batch.student;
        row.insertCell(4).innerHTML =
            '<button onclick="editBatchRow(this)">Edit Batch</button> ' +
            '<button onclick="deleteBatchRow(this)">Delete Batch</button>';

    });
}
    
displayStudents();
displayTrainer();
displayBatch();