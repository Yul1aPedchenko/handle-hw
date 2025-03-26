import { basePost } from "./post";
const BASE_URL = "http://localhost:3000/posts";
async function getPosts() {
  try {
    const r = await fetch(`${BASE_URL}`);
    const posts = await r.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
}
// Створення нового поста
async function createPost(title, content) {
  try {
    const bodyEl = JSON.stringify(new basePost(title, content));
    const options = {
      method: "POST",
      body: bodyEl,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const r = await fetch(`${BASE_URL}`, options);
    const data = await r.json();
    await startApp();
  } catch (error) {
    console.error(error);
  }
}

// Оновлення поста
async function updatePost(id, title, content) {
  try {
  } catch (error) {
    console.error(error);
  }
}
// Видалення поста
async function deletePost(id) {
  try {
  } catch (error) {
    console.error(error);
  }
}
// Додавання коментаря до поста
async function createComment(postId, comment) {
  try {
  } catch (error) {
    console.error(error);
  }
}
// // Оновлення відображення постів на сторінці
function renderPosts(posts) {
    document.getElementById("postsContainer").innerHTML = ''
  const markUp = posts.map((post) => {
    const comments = post.comments;
    return `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.text}</p>
                <button class="editPostButton" data-id="${
                  post.id
                }">Редагувати</button>
                <button class="deletePostButton" data-id="${
                  post.id
                }">Видалити</button>
                <div class="commentsContainer" data-id="${post.id}">
                    <h3>Коментарі:</h3>
                    <ul>
                    ${comments
                      .map((comment) => {
                        return `<li>${comment.content}</li>`;
                      })
                      .join("")}
                    </ul>
                    <form class="createCommentForm">
                    <input
                        type="text"
                        class="commentInput"
                        placeholder="Новий коментар"
                        required
                    />
                    <button type="submit">Додати коментар</button>
                    </form>
                </div>
            </div>
            `;
  });
  document
    .getElementById("postsContainer")
    .insertAdjacentHTML("beforeend", markUp.join(""));
}
// // Обробник події для створення поста
document.getElementById("createPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("titleInput").value;
  const content = document.getElementById("contentInput").value;
  createPost(title, content);
});
// // Обробник події для редагування поста
// document.addEventListener("click", cb);
// // Обробник події для видалення поста
// document.addEventListener("click", cb);
// // Обробник події для додавання коментаря
// document.addEventListener("submit", cb);
// // Запуск додатку
async function startApp() {
  const posts = await getPosts();
  renderPosts(posts);
}
startApp();
