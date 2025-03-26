const BASE_URL = "http://localhost:3000/posts";
async function getPosts() {
    try {
        const r = await fetch(`${BASE_URL}`);
        const posts = await r.json();
        console.log(posts);
        renderPosts(posts);
    } catch (error) {
        console.error(error);
    }
}
// Створення нового поста
async function createPost(title, content) {}
// Оновлення поста
async function updatePost(id, title, content) {}
// Видалення поста
async function deletePost(id) {}
// Додавання коментаря до поста
async function createComment(postId, comment) {}
// // Оновлення відображення постів на сторінці
function renderPosts(posts) {}
// // Обробник події для створення поста
// document.getElementById("createPostForm").addEventListener("submit", cb);
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

//# sourceMappingURL=index.672d4772.js.map
