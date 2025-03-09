// import NewApiService from "./js/js-search";
// import Handlebars from "handlebars";

class NewApiService {
  constructor() {
    (this.type = true), (this.page = 1);
  }
  async fetchImages() {
    const API_KEY = "49248901-d6c95cf50118914c4de622d87";
    const url = `https://pixabay.com/api/?key=${API_KEY}&editors_choice=${this.type}&page=${this.page}&per_page=9`;
    const response = await fetch(url);
    const data = await response.json();
    this.incrementPage();
    return data.hits || [];
  }
  incrementPage() {
    this.page += 1;
  }
}



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
  // const templateSource = `
  //   {{#each this}}
  //       <img src="{{webformatURL}}" alt="tags">
  //   {{/each}}
  //   `;
  // console.log(images);
  // const template = Handlebars.compile(templateSource);
  // const markup = template(images);
  const markUp = images.map(image => {
    return `<img src="${image.webformatURL}" alt="${image.tags}">`;
  })
  refs.galleryBody.insertAdjacentHTML("beforeend", markUp.join(''));
}
