import NewApiService from "./js/js-search";
import Handlebars from "handlebars";
const refs = {
  btnLoadMore: document.getElementById("load-more-btn"),
  galleryBody: document.getElementById("image-gallery"),
};
const newApiService = new NewApiService();
document.addEventListener('DOMContentLoaded', () => {
    newApiService.fetchImages().then(appendImagesMarkup);
})
refs.btnLoadMore.addEventListener("click", onLoadMore);
function onLoadMore() {
  newApiService.fetchImages().then(appendImagesMarkup);
}
function appendImagesMarkup(images) {
  const templateSource = `
    {{#each this}}
        <img src="{{webformatURL}}" alt="tags">
    {{/each}}
    `;
  console.log(images);
  const template = Handlebars.compile(templateSource);
  const markup = template(images);
  refs.galleryBody.insertAdjacentHTML("beforeend", markup);
}
