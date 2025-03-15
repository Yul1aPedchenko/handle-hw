const BASE_URL = `http://localhost:3000/students`;
class Options {
  constructor(method, body, headers) {
    this.method = method || "GET";
    this.body = body || null;
    Object.defineProperty(this, "headers", {
      value: headers || { "Content-Type": "application/json" },
      writable: false,
      configurable: false,
    });
  }
}
const refs = {
  getBtn: document.getElementById("get-students-btn"),
  tableBody: document.querySelector("#students-table tbody"),
  form: document.getElementById("add-student-form"),
  modal: {
    modalBody: document.getElementById("edit-modal"),
    modalForm: document.getElementById("edit-student-form"),
  },
};
refs.getBtn.addEventListener("click", getStudents);
refs.form.addEventListener("submit", addStudent);
refs.tableBody.addEventListener("click", (e) => {
  if (e.target && e.target.id === "update-student-btn") {
    const studentId = e.target.getAttribute("data-id");
    openModal(studentId);
  }
});
refs.modal.modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const studentId = refs.modal.modalForm.getAttribute("data-id");
  const updatedStudent = {
    name: document.getElementById("edit-name").value,
    age: document.getElementById("edit-age").value,
    course: document.getElementById("edit-course").value,
    skills: document
      .getElementById("edit-skills")
      .value.split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill),
    email: document.getElementById("edit-email").value,
    isEnrolled: document.getElementById("edit-isEnrolled").checked,
  };
  updateStudent(studentId, updatedStudent);
  refs.modal.modalBody.style.display = "none";
  refs.modal.modalForm.reset();
  refs.modal.modalForm.setAttribute("data-id", null);
});
refs.tableBody.addEventListener("click", (e) => {
  if (e.target && e.target.id === "delete-student-btn") {
    const studentId = e.target.getAttribute("data-id");
    deleteStudent(studentId);
  }
});
function getStudents() {
  return fetch(`${BASE_URL}`)
    .then((r) => r.json())
    .then((students) => renderStudents(students))
    .catch((error) => console.log(`Some problems with get students: ${error}`));
}
function renderStudents(students) {
  refs.tableBody.innerHTML = "";
  markUp = students.map((student) => {
    return `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.skills}</td>
            <td>${student.email}</td>
            <td>${student.isEnrolled}</td>
             <td> 
            <button id="update-student-btn" data-id="${student.id}">Редагувати</button>
            <button id="delete-student-btn" data-id="${student.id}">Видалити</button></td>
        </tr>`;
  });

  refs.tableBody.insertAdjacentHTML("beforeend", markUp.join(" "));
}
function addStudent(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;
  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill);
  const email = document.getElementById("email").value;
  const isEnrolled = document.getElementById("isEnrolled").checked;
  const newStudent = {
    name,
    age,
    course,
    skills,
    email,
    isEnrolled,
  };
  const newOptions = new Options("POST", JSON.stringify(newStudent));
  fetch(`${BASE_URL}`, newOptions)
    .then((r) => r.json())
    .then(() => getStudents())
    .catch((error) => console.error(`Error with adding student: ${error}`));
  refs.form.reset();
}
function openModal(id) {
  fetch(`${BASE_URL}/${id}`)
    .then((r) => r.json())
    .then((student) => {
      document.getElementById("edit-name").value = student.name;
      document.getElementById("edit-age").value = student.age;
      document.getElementById("edit-course").value = student.course;
      document.getElementById("edit-skills").value = student.skills.join(", ");
      document.getElementById("edit-email").value = student.email;
      document.getElementById("edit-isEnrolled").checked = student.isEnrolled;
      refs.modal.modalForm.setAttribute("data-id", student.id);
    })
    .catch((error) =>
      console.log(`Some problems with get student for edit-modal: ${error}`)
    );
  refs.modal.modalBody.style.display = "block";
}
function updateStudent(id, updateInfo) {
  const newOptions = new Options("PUT", JSON.stringify(updateInfo));
  fetch(`${BASE_URL}/${id}`, newOptions)
    .then((r) => r.json())
    .then(() => getStudents())
    .catch((error) => console.log(`Error with update student info: ${error}`));
}
function deleteStudent(id) {
  const newOptions = new Options("DELETE");
  fetch(`${BASE_URL}/${id}`, newOptions)
    .then((r) => r.json())
    .then(() => getStudents())
    .catch((error) => console.log(`Error with delete student: ${error}`));
}
