function addStudent() {
    alert("Student Added Successfully!");
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