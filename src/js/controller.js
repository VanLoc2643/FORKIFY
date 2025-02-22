// import icons from '../img/icons.svg '; // Parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg'; // Parcel 2
import * as model from './model.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
console.log(icons);
// const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    // Lấy thay đổi phần harsh từ URL
    //!Đây cũng chỉ là logic trình bày
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    //!đây chỉ là logic trình bày không liên quan đến logic nghiệp vụ
    // renderSpinner(recipeContainer);
    recipeView.renderSpinner();
    //!  3 update bookmark (để ở đây vì trc đó ta thêm sự kiện ckick load của tg bookmarkx)
    // debugger;
    bookmarksView.update(model.state.bookmarks);
    //0 cap nhat giao dien selected cuar ket qua search
    resultsView.update(model.getSearchResultPage());

    //?1 Load Recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //Todo:2 Render Recipe

    recipeView.render(model.state.recipe);

    // const recipeView = new recipeView(recipe);
  } catch (e) {
    recipeView.renderError(`We couldn not find that recipe!`);
    console.error(e);
  }
};
// showRecipe();
// controlRecipes();

const controlSearchRecipes = async () => {
  try {
    console.log(resultsView);
    //1, get search query
    const query = searchView.getQuery();
    console.log(query);
    if (!query) {
      resultsView.renderMessage('Vui lòng nhập từ khóa tìm kiếm!');
      return;
    }
    resultsView.renderSpinner();
    //2.load search reasult
    await model.loadSearchResult(query);

    //todo: 3.render result
    console.log(model.state.search.results);
    console.log(model.getSearchResultPage(1));
    resultsView.render(model.state.search.results);
    // resultsView.render(model.getSearchResultPage());
    // resultsView.update(model.getSearchResultPage());
    //todo: 4 . hiện thị nút phân trang

    paginationView.render(model.state.search);
  } catch (e) {
    recipeView.renderError(`We couldn not find that recipe!`);
  }
};

const controlPagination = goToPage => {
  //todo: 3. New render result

  // New  resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultPage(goToPage));

  //todo: 4 . hiện thị nút phân trang
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  if (!model.state.recipe || !model.state.recipe.ingredients) return;
  //! Cap nhat khau phan
  model.updateServings(newServings);

  //!update lai view
  //recipeView.render (model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  //! ADD or remove bookmark
  console.log(model.state.recipe.bookmarked);
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //! Update recipe view
  recipeView.update(model.state.recipe);

  //!render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};
function init() {
  //!Đây là thành phần lắng nghe dữ liệu hoặc sự kiện từ Publisher.
  recipeView.addHandlerRender(controlRecipes);

  recipeView.addHandleServings(controlServings);
  recipeView.addHandleAddBookmark(controlAddBookmark);
  searchView.addHandleSearch(controlSearchRecipes);
  paginationView.addHandleClick(controlPagination);
  //   controlRecipes() (hàm tải dữ liệu từ API) chỉ được gọi khi có thay đổi trên URL (hashchange) hoặc khi load trang.
  // controlServings() lại được gọi ngay lập tức khi init() chạy, trước cả khi người dùng chọn công thức nào đó

  bookmarksView.addHandleRender(controlBookmarks);
}
init();
