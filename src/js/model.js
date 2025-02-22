import * as config from './config';
import { getJSON } from './helpers';
export const state = {
  //!Tao một object state để chứa dữ liệu (tranh việc recipe chỉ là 1 biến cục bộ )

  recipe: {},
  search: {
    query: '',
    results: '',
    resultsPerPage: config.RES_PER_PAG,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    //Todo: Loading Fetch data từ API
    // const res = await fetch(
    //   // 'https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e897b'

    // );
    // const data = await res.json();
    const data = await getJSON(`${config.API_URL}/${id}`);

    //!Lấy recipe từ data.data bằng destructuring.
    const { recipe } = data.data;
    console.log(recipe);
    //! Tạo một object mới để đổi tên và sắp xếp lại dữ liệu
    //Khi dữ liệu được lưu vào state.recipe, nó sẽ không bị mất sau khi hàm loadRecipe kết thúc.
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //!Kiem tra xem trong bookmarks da co mon an id trung vs du lieu da load chua
    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    console.log(recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadSearchResult = async query => {
  try {
    state.search.query = query;

    const data = await getJSON(`${config.API_URL}?search=${query}`);
    console.log(data);
    //! ở đây trả về 1 mảng mới và đối tượng mới
    //! Dùng .map() để tạo mảng mới với cấu trúc đơn giản hơn
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    //! .map() tạo một mảng mới, nhưng nếu không gán vào biến, mảng mới đó sẽ không được lưu tr
    state.search.page = 1;
    //!cần gán kết quả của .map() vào một biến hoặc vào state là vì .map() trả về một mảng mới nhưng không tự động lưu kết quả đó.
    //! Nếu không gán vào một biến, dữ liệu sẽ bị mất ngay sau khi .map() thực thi xong.
    // console.log(state.search.results);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};
// loadSearchResult('pizza');

export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  //!Cập nhật số lượng nguyên liệu dựa trên số khẩu phần mới.
  //? Nếu tăng khẩu phần ăn nên thì số lượng củng phải tăg đồng thời
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.serving;

    //newQt - oldQt * newServings / oldServing
  });

  state.recipe.serving = newServings;
};

export const addBookmark = function (recipe) {
  //!Them bookmark
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //!nen nho ta xoa theo id chứ ko phải vi tri
  const index = state.bookmarks.findIndex(bm => bm.id === id);
  state.bookmarks.splice(index, 1);

  //bo trang thai
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
};
const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};
init();
console.log('😋', state.bookmarks);

const clearStorageBookmarks = () => {
  localStorage.clear('bookmarks');
};

clearStorageBookmarks();
