const BASE_URL = `http://localhost:3000/students`;
// fetch(BASE_URL)
//   .then(r => r.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
// fetch(`${BASE_URL}/1`)
//     .then(r => r.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))
//* async/await and try/catch
//* function declaration
// async function getAllStusents() {
//     try {
//         const r = await fetch(`${BASE_URL}`);
//         const data = await r.json();
//         console.log(data);
//     } catch (error) {
//         console.log(error)
//     }
// }
// async function getStudentById(id) {
//     try {
//         const r = await fetch(`${BASE_URL}/${id}`);
//         const data = await r.json();
//         console.log(data)
//     } catch (error) {
//         console.error(error);
//     }
// }
// getStudentById(1);
//? POST
// const newStudent = {
//     name: 'Ann',
//     age: 17,
//     email: 'ann1234@gmail.com',
//     phone: '123-1234'
// }
// const options = {
//     method: 'POST',
//     body: JSON.stringify(newStudent),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }
// fetch(BASE_URL, options).then(r => r.json())
//     .then(data => console.log(data))
// const newStudentData = {
//   name: "OLEG LOX",
//     age: 19,
//     email: '123',
//   phone: '12333'
// };
//* async/await
//* functcion declaration
// async function addStusent(student) {
//   try {
//     const r = await fetch(`${BASE_URL}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ student }),
//     });
//     const data = await r.json();
//     console.log(`New student:`, data);
//   } catch (error) {
//     console.error(error);
//   }
// }
// //?PUT
// const options = {
//   method: "PUT",
//   body: JSON.stringify(newStudentData),
//   headers: {
//     "Content-Type": "application/json",
//   }
// };
// fetch(`${BASE_URL}/2`, options)
//   .then(r => r.json())
//   .then(data => console.log(data));
async function patchStusent(id, patchData) {
    try {
        const r = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchData)
        });
        const data = await r.json();
        console.log(`update student:`, data);
    } catch (error) {
        console.error(error);
    }
}
//?PATCH
// const options = {
//   method: "PATCH",
//   body: JSON.stringify({
//     age: 100,
//     email: "example@gmail.com",
//   }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// };
// fetch(`${BASE_URL}/3`, options)
//   .then((r) => r.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
async function updateStusent(id, updateData) {
    try {
        const r = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateDate)
        });
        const data = await r.json();
        console.log(`update student:`, data);
    } catch (error) {
        console.error(error);
    }
}
//? DELETE
async function deleteStudent(id) {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log(`Student was deleted`);
    } catch (error) {
        console.error(error);
    }
}

//# sourceMappingURL=index.3f803a5a.js.map
