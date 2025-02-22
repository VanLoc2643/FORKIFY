class SearchView {
  _parentElement = document.querySelector('.search');

  //! co thể việt đc trong controller nhưng controller ko liên quan gì đến DOM cả
  //!Nói chung là controller ko bt sự tồn tai của DOM
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    return (this._parentElement.querySelector('.search__field').value = '');
  }

  addHandleSearch(handle) {
    this._parentElement.addEventListener('submit', e => {
      //!1. ngăn sự kiện submit ngay từu đầu load lại trang
      e.preventDefault(e);
      //!2.Đây là thành phần lắng nghe dữ liệu hoặc sự kiện từ Publisher.
      handle(); //!Khi Publisher phát ra sự kiện, tất cả Subscriber đã đăng ký sẽ nhận được thông báo
    });
  }
}

export default new SearchView();
