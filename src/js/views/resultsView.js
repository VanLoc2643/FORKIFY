import View from './View';
import previewView from './previewView';
class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _recipeError =
    'No recipes found for your query! Please try again Ex: Pizza, Pasta, Dip..';
  _message = '';
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join();
  }
  // _generateMarkup() {
  //   console.log(this._data);
  //   return this._data.map(this._generateMarkupPreView).join();
  // }

  // _generateMarkupPreView(rec) {
  //   const id = window.location.hash.slice(1);

  //   return ` <li class="preview">
  //   <a class="preview__link ${
  //     rec.id === id ? 'preview__link--active' : ''
  //   } "  href="#${rec.id}">
  //     <figure class="preview__fig">
  //       <img src=${rec.image} alt="Test" />
  //     </figure>
  //     <div class="preview__data">
  //       <h4 class="preview__title">${rec.title}</h4>
  //       <p class="preview__publisher">${rec.publisher}</p>

  //     </div>
  //   </a>
  // </li>`;
  // }
}

export default new resultsView();
