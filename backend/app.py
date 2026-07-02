import os
import json
from flask import Flask, render_template, request, redirect, url_for,jsonify

# Safely paths your frontend directory folders
base_dir = os.path.abspath(os.path.dirname(__file__))
frontend_path = os.path.join(base_dir, "..", "frontend")

app = Flask(__name__, 
            template_folder=frontend_path, 
            static_folder=frontend_path,
            static_url_path='')

DATA_FILE = os.path.join(base_dir, "students.json")

def load_stored_students():
    """Reads saved students from the JSON file safely."""
    if not os.path.exists(DATA_FILE):
        default_list = [
            {"id": "1", "name": "Rahul", "batch": "Batch A"},
            {"id": "2", "name": "Priya", "batch": "Batch B"},
            {"id": "3", "name": "Arun", "batch": "Batch A"}
        ]
        with open(DATA_FILE, "w") as f:
            json.dump(default_list, f, indent=4)
        return default_list
    
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except:
        return []

def save_stored_students(student_list):
    """Saves updated student roster cleanly into your text file."""
    with open(DATA_FILE, "w") as f:
        json.dump(student_list, f, indent=4)


# ---------------------------------------------------------
# ROUTES
# ---------------------------------------------------------
@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == "admin" and password == "12345":
            return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/students')
def students():
    return render_template('students.html')

@app.route('/api/students', methods=['GET', 'POST'])
def handle_students():
    current_list = load_stored_students()
    
    if request.method == 'POST':
        new_student_package = request.get_json()
        target_id = str(new_student_package.get('id')).strip()
        
        # Check if ID exists to update instead of creating a duplicate
        existing_student = None
        for student in current_list:
            if str(student.get('id')).strip() == target_id:
                existing_student = student
                break
        
        if existing_student:
            existing_student['name'] = new_student_package.get('name')
            existing_student['batch'] = new_student_package.get('batch')
        else:
            current_list.append(new_student_package)
            
        save_stored_students(current_list) 
        return {"status": "success", "message": "Saved successfully!"}
    
    return {"students": current_list}

@app.route('/api/students/delete', methods=['POST'])
def delete_student():
    delete_request = request.get_json()
    target_id = str(delete_request.get('id')).strip()
    
    current_list = load_stored_students()
    updated_list = [s for s in current_list if str(s.get('id')).strip() != target_id]
    
    save_stored_students(updated_list)
    return {"status": "success", "message": "Deleted successfully"}

# ---------------------------------------------------------
# MODULE 4: TRAINERS MANAGEMENT
# ---------------------------------------------------------
TRAINER_FILE = os.path.join(base_dir, "trainers.json")

def load_stored_trainers():
    """Reads saved trainers from the local file storage."""
    if not os.path.exists(TRAINER_FILE):
        default_trainers = [
            {"id": "1", "name": "Mr. Kumar", "subject": "HTML"},
            {"id": "2", "name": "Ms. Priya", "subject": "CSS"}
        ]
        with open(TRAINER_FILE, "w") as f:
            json.dump(default_trainers, f, indent=4)
        return default_trainers
    try:
        with open(TRAINER_FILE, "r") as f:
            return json.load(f)
    except:
        return []

def save_stored_trainers(trainer_list):
    """Saves updated trainer roster into JSON storage."""
    with open(TRAINER_FILE, "w") as f:
        json.dump(trainer_list, f, indent=4)
@app.route('/trainer')

@app.route('/trainers')

def trainers():
    return render_template('trainer.html')

# Endpoint handling saving and editing operations
@app.route('/api/trainers', methods=['GET', 'POST'])
def handle_trainers():
    current_list = load_stored_trainers()
    
    if request.method == 'POST':
        new_trainer = request.get_json()
        target_id = str(new_trainer.get('id')).strip()
        
        # Check if Trainer ID exists to apply edits or create a fresh entry
        existing_trainer = None
        for trainer in current_list:
            if str(trainer.get('id')).strip() == target_id:
                existing_trainer = trainer
                break
                
        if existing_trainer:
            existing_trainer['name'] = new_trainer.get('name')
            existing_trainer['subject'] = new_trainer.get('subject')
        else:
            current_list.append(new_trainer)
            
        save_stored_trainers(current_list)
        return {"status": "success", "message": "Trainer entry updated successfully!"}
        
    return {"trainers": current_list}

# Endpoint handling removal operation
@app.route('/api/trainers/delete', methods=['POST'])
def delete_trainer():
    delete_request = request.get_json()
    target_id = str(delete_request.get('id')).strip()
    
    current_list = load_stored_trainers()
    updated_list = [t for t in current_list if str(t.get('id')).strip() != target_id]
    
    save_stored_trainers(updated_list)
    return {"status": "success", "message": "Trainer cleared successfully"}


# ---------------------------------------------------------
# MODULE 5: BATCHES MANAGEMENT
# ---------------------------------------------------------
BATCH_FILE = os.path.join(base_dir, "batches.json")

def load_stored_batches():
    """Reads saved training batches from file storage."""
    if not os.path.exists(BATCH_FILE):
        default_batches = [
            {"id": "B001", "name": "Python Batch A", "trainer": "Anitha", "students": "30"},
            {"id": "B002", "name": "Web Development", "trainer": "Rahul", "students": "25"}
        ]
        with open(BATCH_FILE, "w") as f:
            json.dump(default_batches, f, indent=4)
        return default_batches
    try:
        with open(BATCH_FILE, "r") as f:
            return json.load(f)
    except:
        return []

def save_stored_batches(batch_list):
    """Writes active training roster into JSON file database."""
    with open(BATCH_FILE, "w") as f:
        json.dump(batch_list, f, indent=4)

# Map the link from your navigation bar layout cleanly
@app.route('/badges')
@app.route('/batch')
def batches():
    return render_template('batch.html')

# Endpoint processing additions and inline tracking adjustments
@app.route('/api/batches', methods=['GET', 'POST'])
def handle_batches():
    current_list = load_stored_batches()
    
    if request.method == 'POST':
        new_batch = request.get_json()
        target_id = str(new_batch.get('id')).strip()
        
        existing_batch = None
        for batch in current_list:
            if str(batch.get('id')).strip() == target_id:
                existing_batch = batch
                break
                
        if existing_batch:
            existing_batch['name'] = new_batch.get('name')
            existing_batch['trainer'] = new_batch.get('trainer')
            existing_batch['students'] = new_batch.get('students')
        else:
            current_list.append(new_batch)
            
        save_stored_batches(current_list)
        return {"status": "success", "message": "Batch details updated successfully!"}
        
    return {"batches": current_list}

# Endpoint handling removal operation
@app.route('/api/batches/delete', methods=['POST'])
def delete_batch():
    delete_request = request.get_json()
    target_id = str(delete_request.get('id')).strip()
    
    current_list = load_stored_batches()
    updated_list = [b for b in current_list if str(b.get('id')).strip() != target_id]
    
    save_stored_batches(updated_list)
    return {"status": "success", "message": "Batch removed successfully"}


# ---------------------------------------------------------
# MODULE 6: ATTENDANCE MANAGEMENT
# ---------------------------------------------------------
ATTENDANCE_FILE = os.path.join(base_dir, "attendance.json")

def load_stored_attendance():
    if not os.path.exists(ATTENDANCE_FILE):
        default_attendance = [
            {"name": "Rahul", "date": "2026-06-22", "batch": "Python batch A", "status": "Present"},
            {"name": "Priya", "date": "2026-06-22", "batch": "Web development", "status": "Absent"},
            {"name": "Arun", "date": "2026-06-22", "batch": "java", "status": "Present"}
        ]
        with open(ATTENDANCE_FILE, "w") as f:
            json.dump(default_attendance, f, indent=4)
        return default_attendance
    try:
        with open(ATTENDANCE_FILE, "r") as f: return json.load(f)
    except: return []

def save_stored_attendance(att_list):
    with open(ATTENDANCE_FILE, "w") as f: json.dump(att_list, f, indent=4)

@app.route('/attendance')
def attendance_page():
    return render_template('attendance.html')

@app.route('/api/attendance', methods=['GET', 'POST'])
def handle_attendance():
    current_list = load_stored_attendance()
    if request.method == 'POST':
        new_entry = request.get_json()
        current_list.append(new_entry)
        save_stored_attendance(current_list)
        return {"status": "success"}
    return {"attendance": current_list}

@app.route('/api/attendance/toggle', methods=['POST'])
def toggle_attendance():
    req = request.get_json()
    name = req.get('name')
    date = req.get('date')
    current_list = load_stored_attendance()
    for entry in current_list:
        if entry.get('name') == name and entry.get('date') == date:
            entry['status'] = "Absent" if entry['status'] == "Present" else "Present"
            break
    save_stored_attendance(current_list)
    return {"status": "success"}
@app.route('/api/attendance/update', methods=['POST'])
def update_attendance():
    try:
        data = request.get_json()
        idx = int(data.get('index'))
        
        # 1. Load the fresh attendance list straight from your storage function
        temp_list = load_stored_attendance()
        
        # 2. Check if the index position exists in your list
        if 0 <= idx < len(temp_list):
            item = temp_list[idx]
            
            # Identify which keys your data objects are using
            name_key = 'name' if 'name' in item else ('student_name' if 'student_name' in item else 'name')
            date_key = 'date' if 'date' in item else ('attendance_date' if 'attendance_date' in item else 'date')
            batch_key = 'batch' if 'batch' in item else ('batch_name' if 'batch_name' in item else 'batch')
            status_key = 'status' if 'status' in item else 'status'

            # Overwrite the properties inside that exact row position
            item[name_key] = data.get('name')
            item[date_key] = data.get('date')
            item[batch_key] = data.get('batch')
            item[status_key] = data.get('status')

            # 3. Save the modified list back to your file storage
            save_stored_attendance(temp_list)
            return jsonify({"status": "success", "message": "Updated successfully"}), 200
        else:
            return jsonify({"status": "error", "message": "Index out of range"}), 400
            
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/api/attendance/delete', methods=['POST'])
def delete_attendance():
    try:
        data = request.get_json()
        idx = int(data.get('index'))
        
        # 1. Load the fresh attendance list straight from your storage function
        temp_list = load_stored_attendance()
        
        # 2. Pop the record out of the array using its position index
        if 0 <= idx < len(temp_list):
            temp_list.pop(idx)
            
            # 3. Save the updated list back to file storage
            save_stored_attendance(temp_list)
            return jsonify({"status": "success", "message": "Deleted successfully"}), 200
        else:
            return jsonify({"status": "error", "message": "Index out of range"}), 400

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
# ---------------------------------------------------------
# MODULE 7: SESSIONS MANAGEMENT
# ---------------------------------------------------------
SESSION_FILE = os.path.join(base_dir, "sessions.json")

def load_stored_sessions():
    if not os.path.exists(SESSION_FILE):
        default_sessions = [
            {"id": "101", "topic": "HTML Basics", "trainer": "Mr. Kumar"},
            {"id": "102", "topic": "CSS Basics", "trainer": "Ms. Priya"},
            {"id": "103", "topic": "Javascript", "trainer": "Mr. Ravi"}
        ]
        with open(SESSION_FILE, "w") as f:
            json.dump(default_sessions, f, indent=4)
        return default_sessions
    try:
        with open(SESSION_FILE, "r") as f: return json.load(f)
    except: return []

def save_stored_sessions(session_list):
    with open(SESSION_FILE, "w") as f: json.dump(session_list, f, indent=4)

@app.route('/sessions')
def sessions_page():
    return render_template('sessions.html')

@app.route('/api/sessions', methods=['GET', 'POST'])
def handle_sessions():
    current_list = load_stored_sessions()
    if request.method == 'POST':
        new_session = request.get_json()
        target_id = str(new_session.get('id')).strip()
        
        existing_session = None
        for s in current_list:
            if str(s.get('id')).strip() == target_id:
                existing_session = s
                break
                
        if existing_session:
            existing_session['topic'] = new_session.get('topic')
            existing_session['trainer'] = new_session.get('trainer')
        else:
            current_list.append(new_session)
            
        save_stored_sessions(current_list)
        return {"status": "success"}
    return {"sessions": current_list}

@app.route('/api/sessions/delete', methods=['POST'])
def delete_session():
    req = request.get_json()
    target_id = str(req.get('id')).strip()
    current_list = load_stored_sessions()
    updated_list = [s for s in current_list if str(s.get('id')).strip() != target_id]
    save_stored_sessions(updated_list)
    return {"status": "success"}

# ---------------------------------------------------------
# MODULE 8: REPORTS & LIVE ANALYTICS
# ---------------------------------------------------------
REPORT_FILE = os.path.join(base_dir, "reports.json")

def load_stored_reports():
    if not os.path.exists(REPORT_FILE):
        default_reports = [
            {"id": "R001", "batch": "Python Batch A", "percentage": 92, "status": "Completed"},
            {"id": "R002", "batch": "Web Development", "percentage": 88, "status": "Completed"}
        ]
        with open(REPORT_FILE, "w") as f:
            json.dump(default_reports, f, indent=4)
        return default_reports
    try:
        with open(REPORT_FILE, "r") as f: return json.load(f)
    except: return []

def save_stored_reports(report_list):
    with open(REPORT_FILE, "w") as f: json.dump(report_list, f, indent=4)

@app.route('/reports')
def reports_page():
    return render_template('reports.html')

@app.route('/api/reports', methods=['GET'])
def handle_reports():
    reports_list = load_stored_reports()
    
    # Live Math: Read attendance file to build real mathematical percentages!
    attendance_data = []
    att_file = os.path.join(base_dir, "attendance.json")
    if os.path.exists(att_file):
        try:
            with open(att_file, "r") as f: attendance_data = json.load(f)
        except: pass

    # Compute calculations based on state values
    total_records = len(attendance_data)
    presents = len([a for a in attendance_data if a.get('status') == "Present"])
    computed_avg = round((presents / total_records) * 100) if total_records > 0 else 90

    summary_package = {
        "avg_attendance": computed_avg,
        "best_batch": "Python Batch A" if computed_avg >= 85 else "Web Development",
        "active_trainer": "Anitha"
    }

    return {"reports": reports_list, "summary": summary_package}

@app.route('/api/reports/generate', methods=['POST'])
def generate_new_report():
    current_reports = load_stored_reports()
    new_id = f"R00{len(current_reports) + 1}"
    
    # Generate next snapshot log row data
    new_report_entry = {
        "id": new_id,
        "batch": "Python Batch A" if len(current_reports) % 2 == 0 else "Web Development",
        "percentage": 94 if len(current_reports) % 2 == 0 else 85,
        "status": "Completed"
    }
    
    current_reports.append(new_report_entry)
    save_stored_reports(current_reports)
    return {"status": "success"}

@app.route('/api/reports/delete', methods=['POST'])
def delete_report_log():
    req = request.get_json()
    target_id = str(req.get('id')).strip()
    current_reports = load_stored_reports()
    updated_list = [r for r in current_reports if str(r.get('id')).strip() != target_id]
    save_stored_reports(updated_list)
    return {"status": "success"}

# ---------------------------------------------------------
# MODULE 9: MAIN DASHBOARD LIVE STATS AGGREGATOR
# ---------------------------------------------------------
@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    # 1. Load lists safely from your file utilities
    students = load_stored_students()
    
    # Check trainers list
    trainers_file = os.path.join(base_dir, "trainers.json")
    trainers_count = 0
    if os.path.exists(trainers_file):
        try:
            with open(trainers_file, "r") as f: trainers_count = len(json.load(f))
        except: pass

    # Check sessions list
    sessions_file = os.path.join(base_dir, "sessions.json")
    sessions_count = 0
    if os.path.exists(sessions_file):
        try:
            with open(sessions_file, "r") as f: sessions_count = len(json.load(f))
        except: pass

    # Check reports list
    reports_file = os.path.join(base_dir, "reports.json")
    reports_count = 0
    if os.path.exists(reports_file):
        try:
            with open(reports_file, "r") as f: reports_count = len(json.load(f))
        except: pass

    # 2. Extract Attendance Records and perform metric summary math
    attendance_data = []
    att_file = os.path.join(base_dir, "attendance.json")
    if os.path.exists(att_file):
        try:
            with open(att_file, "r") as f: attendance_data = json.load(f)
        except: pass

    total_att = len(attendance_data)
    presents = len([a for a in attendance_data if a.get('status') == "Present"])
    absents = total_att - presents
    avg_percentage = round((presents / total_att) * 100) if total_att > 0 else 92

    # 3. Ship out the consolidated totals object package
    return {
        "students_count": len(students),
        "trainers_count": trainers_count if trainers_count > 0 else 2,
        "sessions_count": sessions_count if sessions_count > 0 else 3,
        "reports_count": reports_count if reports_count > 0 else 2,
        "present_count": presents if total_att > 0 else 3,
        "absent_count": absents if total_att > 0 else 1,
        "attendance_avg": avg_percentage
    }

if __name__ == '__main__':
    app.run(debug=True)