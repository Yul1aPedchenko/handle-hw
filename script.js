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
async function getStudents() {
  try {
    const response = await fetch(`${BASE_URL}`);
    const students = await response.json();
    renderStudents(students);
  } catch (error) {
    console.error(`Some problems with get students: ${error}`);
  }
}
function renderStudents(students) {
  refs.tableBody.innerHTML = "";
  const markUp = students.map((student) => {
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
async function addStudent(e) {
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
  try {
    const newOptions = new Options("POST", JSON.stringify(newStudent));
    const response = await fetch(`${BASE_URL}`, newOptions);
    await getStudents();
  } catch (error) {
    console.error(`Error with adding student: ${error}`);
  }
  refs.form.reset();
}
async function openModal(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const student = await response.json();
    document.getElementById("edit-name").value = student.name;
    document.getElementById("edit-age").value = student.age;
    document.getElementById("edit-course").value = student.course;
    document.getElementById("edit-skills").value = student.skills.join(", ");
    document.getElementById("edit-email").value = student.email;
    document.getElementById("edit-isEnrolled").checked = student.isEnrolled;

    refs.modal.modalForm.setAttribute("data-id", student.id);
  } catch (error) {
    console.error(
      `Some problems with getting student for edit-modal: ${error}`
    );
  }
  refs.modal.modalBody.style.display = "block";
}
async function updateStudent(id, updateInfo) {
  try {
    const newOptions = new Options("PUT", JSON.stringify(updateInfo));
    const response = await fetch(`${BASE_URL}/${id}`, newOptions);
    await getStudents();
  } catch (error) {
    console.error(`Error with update student info: ${error}`);
  }
}
async function deleteStudent(id) {
  try {
    const newOptions = new Options("DELETE");
    const response = await fetch(`${BASE_URL}/${id}`, newOptions);
    await getStudents();
  } catch (error) {
    console.error(`Error with delete student: ${error}`);
  }
}
