const BASE_URL = `http://localhost:3000/students`;
// fetch(BASE_URL)
//   .then(r => r.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// fetch(`${BASE_URL}/1`)
//     .then(r => r.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

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
// //?PATCH
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


//?PATCH

const options = {
    method: 'PATCH',
    body: JSON.stringify({
        age: 100,
        email: 'example@gmail.com'
    }),
    headers: {
        "Content-Type": "application/json",
    }
}
fetch(`${BASE_URL}/3`, options)
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));