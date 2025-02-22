import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      //!  Lấy số trang dinh chuyen  từ data-go
      //!LUU Y: DATASET LUON TRA VE KIEU STRING
      //Nếu không chuyển đổi, khi em dùng goToPage để thực hiện phép tính, nó sẽ bị lỗi.
      const goToPage = Number(btn.dataset.goto);

      console.log('Chuyen den trang ', goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    //để kiêm tra các trường hợp trước hết ta phait tính xem ta đang có bao nhiêu trang

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;
    console.log(numPages);

    if (numPages === 1) {
      return ''; // ko hien thi button
    }

    const prevButton =
      currentPage > 1
        ? this._generateButtonMarkup(currentPage - 1, 'prev')
        : '';
    const nextButton =
      currentPage < numPages
        ? this._generateButtonMarkup(currentPage + 1, 'next')
        : '';

    return `${prevButton} ${nextButton}`;

    //     //! Th1: Nếu đang ở trang 1
    //     //  cần hiển thị các nút chuyển trang và phải có nhiều hơn 1 trang
    //     if (numPages > 1 && currentPage === 1) {
    //       return `<button class="btn--inline pagination__btn--next">
    //   <span>Page ${currentPage + 1}</span>
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-right"></use>
    //   </svg>
    // </button> `;
    //     }
    //     // Nếu chỉ có 1 trang, không cần hiển thị nút chuyển trang.
    //     // Nếu đang ở trang cuối cùng, cần xác định xem có nút "Trang tiếp theo" không.
    //     if (currentPage === numPages && numPages > 1) {
    //       return `
    //        <button class="btn--inline pagination__btn--prev">
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-left"></use>
    //   </svg>
    //   <span>Page ${currentPage - 1}</span>
    // </button>`;
    //     }

    //     if (currentPage < numPages) {
    //       return `
    //         <button class="btn--inline pagination__btn--prev">
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-left"></use>
    //   </svg>
    //   <span>Page ${currentPage - 1}</span>
    // </button>

    //       <button class="btn--inline pagination__btn--next">
    //   <span>Page ${currentPage + 1}</span>
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-right"></use>
    //   </svg>
    // </button>

    // `;
    //     }

    // return ``;
  }

  _generateButtonMarkup(currentPage, type) {
    const arow = type === 'prev' ? 'left' : 'right';
    return `
     <button data-goto=${currentPage} class="btn--inline pagination__btn--${type}">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-${arow}"></use>
  </svg>
  <span>Page ${currentPage}</span>
</button>
    `;
  }
}

export default new PaginationView();
