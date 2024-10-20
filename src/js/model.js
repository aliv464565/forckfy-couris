import { Api_URL, RES_PER_PAGE, KEY } from './counfing';
// import { getJson, sendJSON } from './helgers';
import { AJAX } from './helgers';
export const stats = {
  recipe: {},
  search: {
    query: {},
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const createREcipeObject = function (data) {
  const { recipe } = data.data;
  return {
    url: recipe.image_url,
    title: recipe.title,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    id: recipe.id,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${Api_URL}/${id}?key=${KEY}`);
    console.log(data);
    stats.recipe = createREcipeObject(data);
    if (stats.bookmarks.some(bookmark => bookmark.id === id))
      stats.recipe.bookmared = true;
    else {
      stats.recipe.bookmared = false;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const searchLoad = async function (quer) {
  try {    
    stats.query = quer;
    const data = await AJAX(`${Api_URL}?search=${quer}&key=${KEY}`);
    stats.search.results = data.data.recipes.map(rec => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          url: rec.image_url,
          ...(rec.key && { key: rec.key }),
        };
      });
    stats.search.page = 1;
    console.log(stats.search.results)
  } catch (error) {
    throw new Error(error);
  }
};

export const getSearchREsultsPage = function (page = stats.search.page) {
  stats.search.page = page; //1
  const start = (page - 1) * RES_PER_PAGE; //0
  const end = page * RES_PER_PAGE; //10
  return stats.search.results.slice(start, end);
};
export const updateServings = function (newServisings) {
  stats.recipe.ingredients?.forEach(ing => {
    ing.quantity = (
      (ing?.quantity * newServisings) /
      stats.recipe.servings
    ).toFixed(2);
  });
  stats.recipe.servings = newServisings;
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(stats.bookmarks));
};
export const addbookmark = function (recipe) {
  stats.bookmarks.push(recipe);
  if (recipe.id === stats.recipe.id) stats.recipe.bookmared = true;
  persistBookmarks();
};
export const deletBoomark = function (id) {
  const index = stats.bookmarks.findIndex(el => el.id === id);
  stats.bookmarks.splice(index, 1);
  if (id === stats.recipe.id) stats.recipe.bookmared = false;
  persistBookmarks();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) stats.bookmarks = JSON.parse(storage);
};
init();
const removeBookmark = function () {
  localStorage.clear('bookmarks');
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        console.log(ing);
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat!Please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      image_url: newRecipe.image,
      title: newRecipe.title,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
      publisher: newRecipe.publisher,
      id: newRecipe.id,
      source_url: newRecipe.sourceUrl,
    };
    const data = await AJAX(`${Api_URL}?key=${KEY}`, recipe);
    stats.recipe = createREcipeObject(data);
    addbookmark(stats.recipe);
  } catch (error) {
    throw error;
  }
};
