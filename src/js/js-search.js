export default class NewApiService {
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
