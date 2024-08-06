let role = 'student'; // Default role
const scheduleList = [];
const announcements = [];
const attendanceRecords = [];

function switchRole(newRole) {
  role = newRole;
  document.querySelectorAll('.admin-only').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.faculty-only').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.student-only').forEach(el => el.classList.add('hidden'));
  
  if (role === 'admin') {
    document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
  } else if (role === 'faculty') {
    document.querySelectorAll('.faculty-only').forEach(el => el.classList.remove('hidden'));
  } else if (role === 'student') {
    document.querySelectorAll('.student-only').forEach(el => el.classList.remove('hidden'));
    renderStudentView();
  }
}

function addSchedule(event) {
  event.preventDefault();
  const course = document.getElementById('course').value;
  const faculty = document.getElementById('faculty').value;
  const day = document.getElementById('day').value;
  const time = document.getElementById('time').value;

  const conflict = scheduleList.some(s => s.day === day && s.time === time);
  if (conflict) {
    alert('Schedule conflict detected!');
    return;
  }

  scheduleList.push({ course, faculty, day, time });
  renderScheduleList();
  document.getElementById('schedule-form').reset();
}

function renderScheduleList() {
  const scheduleListElement = document.getElementById('schedule-list');
  scheduleListElement.innerHTML = scheduleList.map(s => 
    `<div>${s.course} by ${s.faculty} on ${s.day} at ${s.time}</div>`).join('');
}

function postAnnouncement(event) {
  event.preventDefault();
  const announcementText = document.getElementById('announcement-text').value;
  announcements.push(announcementText);
  renderAnnouncementList();
  document.getElementById('announcement-form').reset();
}

function renderAnnouncementList() {
  const announcementListElement = document.getElementById('announcement-list');
  announcementListElement.innerHTML = announcements.map(a => 
    `<div>${a}</div>`).join('');
}

function markAttendance(event) {
  event.preventDefault();
  const studentName = document.getElementById('student-name').value;
  const status = document.getElementById('attendance-status').value;
  attendanceRecords.push({ studentName, status });
  renderAttendanceList();
  document.getElementById('attendance-form').reset();
}

function renderAttendanceList() {
  const attendanceListElement = document.getElementById('attendance-list');
  attendanceListElement.innerHTML = attendanceRecords.map(a => 
    `<div>${a.studentName}: ${a.status}</div>`).join('');
}

function renderStudentView() {
  const studentScheduleElement = document.getElementById('student-schedule');
  studentScheduleElement.innerHTML = scheduleList.map(s => 
    `<div>${s.course} on ${s.day} at ${s.time} by ${s.faculty}</div>`).join('');
  
  const studentAnnouncementsElement = document.getElementById('student-announcements');
  studentAnnouncementsElement.innerHTML = announcements.map(a => 
    `<div>${a}</div>`).join('');
}

// Initialize the interface based on the default role
switchRole(role);

// Add event listeners
document.getElementById('schedule-form').addEventListener('submit', addSchedule);
document.getElementById('announcement-form').addEventListener('submit', postAnnouncement);
document.getElementById('attendance-form').addEventListener('submit', markAttendance);
