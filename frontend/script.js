function viewAttendance() {


    let table = document.getElementById("attendanceTable");

    let data = JSON.parse(localStorage.getItem("attendance")) || [];

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Batch</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    data.forEach((a, index) => {

        let row = table.insertRow();

        row.insertCell(0).innerText = a.name;
        row.insertCell(1).innerText = a.date;
        row.insertCell(2).innerText = a.batch;
        row.insertCell(3).innerText = a.status;

        row.insertCell(4).innerHTML =
            `<button onclick="editAttendance(${index})">Edit</button>`;
    });

    table.style.display = "table";
    table.scrollIntoView({behavior:"smooth"});
}
// =======================================
// DATE & TIME
// =======================================

window.onload = function(){

    let dt = document.getElementById("dateTime");
    if(dt){
        dt.innerHTML = new Date().toLocaleString();
    }

    let loginDt = document.getElementById("loginDateTime");
    if(loginDt){
        loginDt.innerHTML = new Date().toLocaleString();
    }

    loadStudents();
    loadTrainers();

}



// =======================================
// STUDENT MANAGEMENT
// =======================================

// Load Students

function loadStudents() {

    let table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Batch</th>
            <th>Actions</th>
        </tr>
    `;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach(student => {

        let row = table.insertRow();

        row.insertCell(0).innerText = student.id;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.batch;

        row.insertCell(3).innerHTML = `
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        `;
    });

}



// Save Students

function saveStudents() {

    let table = document.getElementById("studentTable");

    let rows = table.rows;

    let students = [];

    for (let i = 1; i < rows.length; i++) {

        students.push({

            id: rows[i].cells[0].innerText,
            name: rows[i].cells[1].innerText,
            batch: rows[i].cells[2].innerText

        });

    }

    localStorage.setItem("students", JSON.stringify(students));

}



// Add Student

function addStudent() {

    let id = document.getElementById("sId").value.trim();
    let name = document.getElementById("sName").value.trim();
    let batch = document.getElementById("sBatch").value.trim();

    if (id === "" || name === "" || batch === "") {

        alert("Please fill all fields.");

        return;

    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push({

        id: id,
        name: name,
        batch: batch

    });

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("sId").value = "";
    document.getElementById("sName").value = "";
    document.getElementById("sBatch").value = "";

    loadStudents();

}



// Edit Student

function editStudent(button) {

    let row = button.parentNode.parentNode;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let id = row.cells[0].innerText;

    let student = students.find(s => s.id === id);

    if (!student) return;

    let newName = prompt("Enter Student Name", student.name);

    if (newName == null) return;

    let newBatch = prompt("Enter Batch", student.batch);

    if (newBatch == null) return;

    student.name = newName;
    student.batch = newBatch;

    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();

}



// Delete Student

function deleteStudent(button) {

    if (!confirm("Delete this student?")) return;

    let row = button.parentNode.parentNode;

    let id = row.cells[0].innerText;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students = students.filter(s => s.id !== id);

    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();

}



// Search Student

function searchStudent() {

    let input = document.getElementById("studentSearch").value.toLowerCase();

    let table = document.getElementById("studentTable");

    let rows = table.getElementsByTagName("tr");

    let found = false;

    for (let i = 1; i < rows.length; i++) {

        let text = rows[i].cells[1].innerText.toLowerCase();

        if (text.includes(input)) {

            rows[i].style.display = "";

            found = true;

        }

        else {

            rows[i].style.display = "none";

        }

    }

    if (!found && input !== "") {

        alert("Student not found.");

    }

}
// =======================================
// TRAINER MANAGEMENT
// =======================================

// Load Trainers
function loadTrainers() {

    let table = document.getElementById("trainerTable");
    if (!table) return;

    let data = JSON.parse(localStorage.getItem("trainers"));

    // First time only: save existing HTML rows
    if (!data) {

        data = [];

        let rows = table.getElementsByTagName("tr");

        for (let i = 1; i < rows.length; i++) {

            data.push({
                id: rows[i].cells[0].innerText,
                name: rows[i].cells[1].innerText,
                subject: rows[i].cells[2].innerText
            });
        }

        localStorage.setItem("trainers", JSON.stringify(data));
    }

    // Clear table except header
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Actions</th>
        </tr>
    `;

    // Reload data
    data = JSON.parse(localStorage.getItem("trainers")) || [];

    data.forEach(function(t){

        let row = table.insertRow();

        row.insertCell(0).innerText = t.id;
        row.insertCell(1).innerText = t.name;
        row.insertCell(2).innerText = t.subject;
        row.insertCell(3).innerHTML =
            '<button onclick="editTrainer(this)">Edit</button> ' +
            '<button onclick="deleteTrainer(this)">Delete</button>';
    });
}


// Save Trainers
function saveTrainers() {

    let table = document.getElementById("trainerTable");

    let rows = table.rows;

    let trainers = [];

    for (let i = 1; i < rows.length; i++) {

        trainers.push({

            id: rows[i].cells[0].innerText,
            name: rows[i].cells[1].innerText,
            subject: rows[i].cells[2].innerText

        });

    }

    localStorage.setItem("trainers", JSON.stringify(traineres));

}


// Add Trainer
function addTrainer() {

    let id = document.getElementById("tId").value.trim();
    let name = document.getElementById("tName").value.trim();
    let subject = document.getElementById("tSubject").value.trim();

    if (!id || !name || !subject) {
        alert("Please fill all fields.");
        return;
    }

    let trainers = JSON.parse(localStorage.getItem("trainers")) || [];

    trainers.push({
        id: id,
        name: name,
        subject: subject
    });

    localStorage.setItem("trainers", JSON.stringify(trainers));

    loadTrainers();

    document.getElementById("tId").value = "";
    document.getElementById("tName").value = "";
    document.getElementById("tSubject").value = "";
}


// Edit Trainer
function editTrainer(button){

    let row = button.parentNode.parentNode;
    let id = row.cells[0].innerText;

    let newName = prompt("Enter Trainer Name", row.cells[1].innerText);

    if(newName){

        let trainers = JSON.parse(localStorage.getItem("trainers")) || [];

        trainers.forEach(function(t){

            if(t.id === id){
                t.name = newName;
            }

        });

        localStorage.setItem("trainers", JSON.stringify(trainers));

        loadTrainers();
    }
}


// Delete Trainer
function deleteTrainer(button){

    if(confirm("Delete this trainer?")){

        let row = button.parentNode.parentNode;
        let id = row.cells[0].innerText;

        let trainers = JSON.parse(localStorage.getItem("trainers")) || [];

        trainers = trainers.filter(t => t.id !== id);

        localStorage.setItem("trainers", JSON.stringify(trainers));

        loadTrainers();
    }
}


// Search Trainer
function searchTrainer() {

    let input = document.getElementById("trainerSearch").value.toLowerCase();

    let table = document.getElementById("trainerTable");

    let rows = table.getElementsByTagName("tr");

    let found = false;

    for (let i = 1; i < rows.length; i++) {

        let text = rows[i].cells[1].innerText.toLowerCase();

        if (text.includes(input)) {

            rows[i].style.display = "";

            found = true;

        } else {

            rows[i].style.display = "none";

        }
    }

    if (!found && input !== "") {

        alert("Trainer not found.");

    }

}


// Assign Trainer
function assignTrainer() {

    let trainer = prompt("Enter Trainer Name");

    if (!trainer) return;

    let batch = prompt("Enter Batch Name");

    if (!batch) return;

    alert(
        "Trainer Assigned Successfully\n\n" +
        "Trainer : " + trainer +
        "\nBatch : " + batch
    );

}
// =======================================
// STUDENT BATCH
// =======================================
function loadBatches() {

    let table = document.getElementById("studentBatch");
    if (!table) return;

    let data = JSON.parse(localStorage.getItem("batches"));

    // Save existing HTML rows only the first time
    if (!data) {

        data = [];

        let rows = table.rows;

        for (let i = 1; i < rows.length; i++) {

            data.push({
                id: rows[i].cells[0].innerText,
                name: rows[i].cells[1].innerText,
                trainer: rows[i].cells[2].innerText,
                students: rows[i].cells[3].innerText
            });
        }

        localStorage.setItem("batches", JSON.stringify(data));
    }

    table.innerHTML = `
    <tr>
        <th>Batch ID</th>
        <th>Batch Name</th>
        <th>Trainer</th>
        <th>Students</th>
        <th>Action</th>
    </tr>
    `;

    data = JSON.parse(localStorage.getItem("batches")) || [];

    data.forEach(function(b){

        let row = table.insertRow();

        row.insertCell(0).innerText = b.id;
        row.insertCell(1).innerText = b.name;
        row.insertCell(2).innerText = b.trainer;
        row.insertCell(3).innerText = b.students;
        row.insertCell(4).innerHTML =
            '<button onclick="editBatch(this)">Edit</button> ' +
            '<button onclick="deleteBatch(this)">Delete</button>';
    });
}

window.addEventListener("load", loadBatches);

function saveBatches() {

    let table = document.getElementById("studentBatch");

    let rows = table.rows;

    let batches = [];

    for (let i = 1; i < rows.length; i++) {

        batches.push({

            id: rows[i].cells[0].innerText,
            name: rows[i].cells[1].innerText,
            trainer: rows[i].cells[2].innerText,
            students:rows[i].cells[3].innerText

        });

    }

    localStorage.setItem("batches", JSON.stringify(batches));

}
function addBatch() {

    let id = document.getElementById("bId").value.trim();
    let name = document.getElementById("bName").value.trim();
    let trainer = document.getElementById("btrainer").value.trim();
    let students = document.getElementById("bstudents").value.trim();


    if (!id || !name || !trainer || !students) {
        alert("Please fill all fields.");
        return;
    }

    let batches = JSON.parse(localStorage.getItem("batches")) || [];

    batches.push({
        id: id,
        name: name,
        trainer: trainer,
        students:students
    });

    localStorage.setItem("batches", JSON.stringify(batches));

    loadBatches();

    document.getElementById("bId").value = "";
    document.getElementById("bName").value = "";
    document.getElementById("btrainer").value = "";
    document.getElementById("bstudents").value = "";

}
function editBatch(button){

    let row = button.parentNode.parentNode;
    let id = row.cells[0].innerText;

    let newName = prompt("Enter Batch Name", row.cells[1].innerText);

    if(newName){

        let batches = JSON.parse(localStorage.getItem("batches")) || [];

        batches.forEach(function(b){

            if(b.id === id){
                b.name = newName;
            }

        });

        localStorage.setItem("batches", JSON.stringify(batches));

        loadBatches();
    }
}

// Delete Batch
function deleteBatch(button){

    if(confirm("Delete this batch?")){

        let row = button.parentNode.parentNode;
        let id = row.cells[0].innerText;

        let batches = JSON.parse(localStorage.getItem("batches")) || [];

        batches = batches.filter(b => b.id !== id);

        localStorage.setItem("batches", JSON.stringify(batches));

        loadBatches();
    }
}


// Search Trainer

 function searchBatch () {
    let input = document.getElementById("batchSearch").value.toLowerCase();

    let table = document.getElementById("studentBatch");

    let rows = table.getElementsByTagName("tr");

    let found = false;

    for (let i = 1; i < rows.length; i++) {

        let text = rows[i].cells[1].innerText.toLowerCase();

        if (text.includes(input)) {

            rows[i].style.display = "";

            found = true;

        } else {

            rows[i].style.display = "none";

        }
    }

    if (!found && input !== "") {

        alert("batch not found.");

    }

}
// =======================================
// ATTENDANCE
// =======================================
function markAttendance() {

    let name = prompt("Student Name");
    let date = prompt("Date (DD-MM-YYYY)");
    let batch = prompt("Batch");
    let status = prompt("Present / Absent");

    if (!name || !date || !batch || !status) return;

    let data = JSON.parse(localStorage.getItem("attendance")) || [];

    data.push({ 
        name:name, 
        date:date, 
        batch:batch, 
        status:status
     });

    localStorage.setItem("attendance", JSON.stringify(data));

    loadAttendance();
}

function loadAttendance() {

    let table = document.getElementById("attendanceTable");

    let data = JSON.parse(localStorage.getItem("attendance")) || [];

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Batch</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    data.forEach((a, index) => {

        let row = table.insertRow();

        row.insertCell(0).innerText = a.name;
        row.insertCell(1).innerText = a.date;
        row.insertCell(2).innerText = a.batch;
        row.insertCell(3).innerText = a.status;

        row.insertCell(4).innerHTML =
            `<button onclick="editAttendance(${index})">Edit</button>`;
    });
}function editAttendance(index) {

    let data = JSON.parse(localStorage.getItem("attendance")) || [];

    let item = data[index];

    let name = prompt("Edit Name", item.name);
    let date = prompt("Edit Date", item.date);
    let batch = prompt("Edit Batch", item.batch);
    let status = prompt("Edit Status", item.status);

    if (!name || !date || !batch || !status) return;

    data[index] = { name, date, batch, status };

    localStorage.setItem("attendance", JSON.stringify(data));

    loadAttendance();
}function searchAttendance() {

    let input = document.getElementById("attendanceSearch").value.toLowerCase();

    let rows = document.getElementById("attendanceTable").getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display =
            rows[i].innerText.toLowerCase().includes(input) ? "" : "none";
    }
}function filterAttendance() {

    let filter = document.getElementById("batchFilter").value.toLowerCase();

    let rows = document.getElementById("attendanceTable").getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let batch = rows[i].cells[2].innerText.toLowerCase();

        if (filter === "all batches" || batch.includes(filter)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}window.onload = function () {
    loadAttendance();
}
//==========
//SESSIONS
//==========
// Load Sessions
function loadSessions() {

    let table = document.getElementById("sessionTable");
    if (!table) return;

    let data = JSON.parse(localStorage.getItem("sessions"));

    // Save existing HTML rows only the first time
    if (!data) {

        data = [];

        let rows = table.rows;

        for (let i = 1; i < rows.length; i++) {

            data.push({
                id: rows[i].cells[0].innerText,
                topic: rows[i].cells[1].innerText,
                trainer: rows[i].cells[2].innerText
            });
        }

        localStorage.setItem("sessions", JSON.stringify(data));
    }

    // Clear table except header
    table.innerHTML = `
        <tr>
            <th>Session ID</th>
            <th>Topic</th>
            <th>Trainer</th>
            <th>Actions</th>
        </tr>
    `;

    data = JSON.parse(localStorage.getItem("sessions")) || [];

    data.forEach(function(s) {

        let row = table.insertRow();

        row.insertCell(0).innerText = s.id;
        row.insertCell(1).innerText = s.topic;
        row.insertCell(2).innerText = s.trainer;
        row.insertCell(3).innerHTML =
            '<button onclick="editSession(this)">Edit</button> ' +
            '<button onclick="deleteSession(this)">Delete</button>';
    });

}

window.addEventListener("load", loadSessions);

// Save Sessions
function saveSessions() {

    let table = document.getElementById("sessionTable");
    let rows = table.rows;

    let sessions = [];

    for (let i = 1; i < rows.length; i++) {

        sessions.push({
            id: rows[i].cells[0].innerText,
            topic: rows[i].cells[1].innerText,
            trainer: rows[i].cells[2].innerText
        });
    }

    localStorage.setItem("sessions", JSON.stringify(sessions));
}

// Add Session
function addSession() {

    let id = document.getElementById("sessionId").value.trim();
    let topic = document.getElementById("sessionTopic").value.trim();
    let trainer = document.getElementById("sessionTrainer").value.trim();

    if (id === "" || topic === "" || trainer === "") {
        alert("Please fill all fields.");
        return;
    }

    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    sessions.push({
        id: id,
        topic: topic,
        trainer: trainer
    });

    localStorage.setItem("sessions", JSON.stringify(sessions));

    document.getElementById("sessionId").value = "";
    document.getElementById("sessionTopic").value = "";
    document.getElementById("sessionTrainer").value = "";

    loadSessions();

    alert("Session added successfully!");
}

// Edit Session
function editSession(button) {

    let row = button.parentNode.parentNode;
    let id = row.cells[0].innerText;

    let newTopic = prompt("Enter New Topic:", row.cells[1].innerText);
    let newTrainer = prompt("Enter New Trainer:", row.cells[2].innerText);

    if (newTopic && newTrainer) {

        let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

        sessions.forEach(function(s) {

            if (s.id === id) {
                s.topic = newTopic;
                s.trainer = newTrainer;
            }

        });

        localStorage.setItem("sessions", JSON.stringify(sessions));

        loadSessions();

        alert("Session updated successfully!");
    }
}

// Delete Session
function deleteSession(button) {

    if (confirm("Delete this session?")) {

        let row = button.parentNode.parentNode;
        let id = row.cells[0].innerText;

        let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

        sessions = sessions.filter(function(s) {
            return s.id !== id;
        });

        localStorage.setItem("sessions", JSON.stringify(sessions));

        loadSessions();

        alert("Session deleted successfully!");
    }
}

// Update Session
function updateSession() {

    let id = prompt("Enter Session ID to update:");

    if (!id) return;

    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    let found = false;

    sessions.forEach(function(s) {

        if (s.id === id) {

            let newTopic = prompt("Enter New Topic:", s.topic);
            let newTrainer = prompt("Enter New Trainer:", s.trainer);

            if (newTopic && newTrainer) {
                s.topic = newTopic;
                s.trainer = newTrainer;
            }

            found = true;
        }

    });

    if (found) {

        localStorage.setItem("sessions", JSON.stringify(sessions));

        loadSessions();

        alert("Session updated successfully!");

    } else {

        alert("Session ID not found!");

    }
}

//Search Session
function searchSession () {
    let input = document.getElementById("sessionSearch").value.toLowerCase();

    let table = document.getElementById("sessionTable");

    let rows = table.getElementsByTagName("tr");

    let found = false;

    for (let i = 1; i < rows.length; i++) {

        let text = rows[i].cells[1].innerText.toLowerCase();

        if (text.includes(input)) {

            rows[i].style.display = "";

            found = true;

        } else {

            rows[i].style.display = "none";

        }
    }

    if (!found && input !== "") {

        alert("batch not found.");

    }

}

//=================
//REPORTS
//==================
function downloadReport() {

    let report =
        "CLASSROOM SESSION REPORT\n\n" +
        "Total Reports Generated : " + document.getElementById("totalReports").innerText + "\n" +
        "Average Attendance : " + document.getElementById("averageAttendance").innerText + "\n" +
        "Best Performing Batch : " + document.getElementById("bestBatch").innerText + "\n" +
        "Most Active Trainer : " + document.getElementById("activeTrainer").innerText + "\n\n" +
        "Highest Attendance : " + document.getElementById("highestAttendance").innerText + "\n" +
        "Lowest Attendance : " + document.getElementById("lowestAttendance").innerText + "\n" +
        "Reports This Month : " + document.getElementById("monthlyReports").innerText + "\n" +
        "Overall Average Attendance : " + document.getElementById("overallAverage").innerText;

    let blob = new Blob([report], { type: "text/plain" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Report.txt";

    link.click();
}function generateReport() {

    document.getElementById("totalReports").innerText = "16";
    document.getElementById("averageAttendance").innerText = "92%";
    document.getElementById("bestBatch").innerText = "Python Batch A";
    document.getElementById("activeTrainer").innerText = "Anitha";

    document.getElementById("highestAttendance").innerText = "Batch A (92%)";
    document.getElementById("lowestAttendance").innerText = "Batch D (75%)";
    document.getElementById("monthlyReports").innerText = "16";
    document.getElementById("overallAverage").innerText = "88%";

    alert("Report Generated Successfully");
}function editReport(button) {

    let row = button.parentNode.parentNode;

    let batch = prompt("Edit Batch", row.cells[1].innerText);
    let percentage = prompt("Edit Attendance %", row.cells[2].innerText);
    let status = prompt("Edit Status", row.cells[3].innerText);

    if (batch == null || percentage == null || status == null)
        return;

    row.cells[1].innerText = batch;
    row.cells[2].innerText = percentage;
    row.cells[3].innerText = status;
}function deleteReport(button) {

    if (confirm("Delete this report?")) {

        let row = button.parentNode.parentNode;

        row.remove();
    }
}