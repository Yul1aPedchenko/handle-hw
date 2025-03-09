const e={btnLoadMore:document.getElementById("load-more-btn"),galleryBody:document.getElementById("image-gallery")},t=new class{constructor(){this.type=!0,this.page=1}async fetchImages(){let e=`https://pixabay.com/api/?key=49248901-d6c95cf50118914c4de622d87&editors_choice=${this.type}&page=${this.page}&per_page=9`,t=await fetch(e),a=await t.json();return this.incrementPage(),a.hits||[]}incrementPage(){this.page+=1}reset(){this.page=1}};function a(t){let a=`
    {{#each this}}
        <img src="{{webformatURL}}" alt="tags">
    {{/each}}
    `;console.log(t);let n=Handlebars.compile(a)(t);e.galleryBody.insertAdjacentHTML("beforeend",n)}document.addEventListener("DOMContentLoaded",()=>{t.fetchImages().then(a)}),e.btnLoadMore.addEventListener("click",function(){t.fetchImages().then(a)});
//# sourceMappingURL=index.0bbe3cf6.js.map
