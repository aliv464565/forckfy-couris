import { stats } from "../model";
import View from "./View";
import icons from 'url:../../img/icons.svg';

 class Pagination extends View {
   _parentElement = document.querySelector('.pagination');
   addhandlerClik(handler) {
     this._parentElement.addEventListener('click', e => {
       const btn = e.target.closest('.btn--inline');
       const Goto = +btn.dataset.goto;
       handler(Goto);
     });
   }
   _generateMarkup() {
     const curPage = this._data.page;
     const numPages = Math.ceil(
       this._data.results.length / this._data.resultsPerPage
     );
     //page 1,and there are other pages

     if (curPage === 1 && numPages > 1) {
       return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
     }
     if (curPage === numPages && numPages > 1) {
       return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
     }

     if (curPage < numPages) {
       return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          `;
     }
     //page 1 ,and there ate other pages
   }
 }
export default new Pagination()