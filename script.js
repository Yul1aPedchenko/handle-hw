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

async function updatePost(id, title, content) {
  try {
    const newBody = JSON.stringify(new basePost(title, content));
    const options = {
      method: "PATCH",
      body: newBody,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const r = await fetch(`${BASE_URL}/${id}`, options);
    const res = await r.json();
    console.log(res);
    startApp();
  } catch (error) {
    console.error(error);
  }
}
async function deletePost(id) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const r = await fetch(`${BASE_URL}/${id}`, options);
    const data = await r.json();
    console.log(`Post ${id} was sucsess deleted`);
    await startApp();
  } catch (error) {
    console.error(error, "Error with delete post");
  }
}
async function createComment(postId, comment) {
  try {
    const responsePost = await fetch(`${BASE_URL}/${postId}`);
    const data = await responsePost.json();
    data.comments.push({ text: comment });
    console.log(data);
    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const r = await fetch(`${BASE_URL}/${postId}`, options);
    const res = await r.json();
    await startApp();
  } catch (error) {
    console.error(error, "Error with creating new comment");
  }
}
// // Оновлення відображення постів на сторінці
function renderPosts(posts) {
  document.getElementById("postsContainer").innerHTML = "";
  const markUp = posts.map((post) => {
    const comments = post.comments;
    return `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.content}</p>
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
                        return `<li>${comment.text}</li>`;
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
              <div class="form-wrap">
              <form>
                <input type="text" id="editTitleInput" placeholder="Заголовок" required />
                <textarea id="editContentInput" placeholder="Зміст" required></textarea>
                <button type="submit" id="editBtn">Зберегти зміни</button>
              </form>
    </div>
            </div>
            `;
  });
  document
    .getElementById("postsContainer")
    .insertAdjacentHTML("beforeend", markUp.join(""));
}
document.getElementById("createPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("titleInput").value;
  const content = document.getElementById("contentInput").value;
  createPost(title, content);
  document.getElementById("createPostForm").reset();
});
document.getElementById("postsContainer").addEventListener("click", (e) => {
  let curId = null;
  if (e.target.classList.contains("editPostButton")) {
    e.preventDefault();
    curId = e.target.dataset.id;
    const postEl = e.target.closest(".post");
    const formEl = postEl.querySelector(".form-wrap");

    if (formEl) {
      formEl.style.display = "block";
      formEl.querySelector("#editTitleInput").value =
        postEl.querySelector("h2").textContent;
      formEl.querySelector("#editContentInput").value =
        postEl.querySelector("p").textContent;
    }

    const editBtn = postEl.querySelector("#editBtn");
    if (editBtn) {
      editBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const title = postEl.querySelector("#editTitleInput").value;
        const content = postEl.querySelector("#editContentInput").value;
        const postId = e.target.dataset.id;

        await updatePost(postId, title, content);
        formEl.style.display = "none";
      });
    }
  }
});

document
  .getElementById("postsContainer")
  .addEventListener("click", async (e) => {
    let curId = null;
    if (e.target.classList.contains("deletePostButton")) {
      curId = e.target.dataset.id;
      await deletePost(curId);
    }
  });

document
  .getElementById("postsContainer")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let curId = null;
    const postEl = e.target.closest(".post");
    const elId = postEl.querySelector("[data-id]");
    curId = elId.dataset.id;
    const comment = postEl.querySelector(".commentInput").value;
    console.log(curId, comment);
    await createComment(curId, comment);
    postEl.querySelector(".commentInput").value = "";
  });

async function startApp() {
  const posts = await getPosts();
  renderPosts(posts);
}
startApp();
