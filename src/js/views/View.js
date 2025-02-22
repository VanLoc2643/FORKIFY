import icons from '../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  render(data, render = true) {
    console.log(data);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }
    // Xóa toàn bộ nội dung trong recipeContainer cũ

    this._clear(); //!Importer

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  //!cập nhật các thuộc tính cần thiết hoặc thay đổi phần tử trong DOM.
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    console.log(currentElements);
    console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      //!nếu Phần tử mới khác phần tử cũ thì ta mới cập nhật phần đos
      // Kiểm tra nếu curEl tồn tại trước khi gán textContent
      //!Update changed text
      if (
        curEl &&
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //!cập nhật text content của các phần tử trong DOM khi có sự thay đổi giữa phần tử cũ và phần tử mới
        //console.log('😀', newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      if (curEl && !newEl.isEqualNode(curEl)) {
        console.log('🙄', newEl.attributes);

        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });

    //!Cap nhat thay doi Attributes
  }

  //!Render loading UI
  renderSpinner = function () {
    const markup = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;

    // this._parentElement.innerHTML = '';
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  //!Render Error
  renderError(mes = this._recipeError) {
    const markup = ` <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${mes}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //!Render Mess
  renderMessage(mes = this._message) {
    const markup = ` <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${mes}</p>
          </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
