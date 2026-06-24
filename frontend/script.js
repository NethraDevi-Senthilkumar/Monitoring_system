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
document.getElementById("dateTime").innerHTML =
new Date().toLocaleString();