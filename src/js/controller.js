// debugger;
import 'core-js';
import { MODAL_CLOSE_SEC } from './counfing.js';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resulteView from './view/resulteView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
if (module.hot) {
  module.hot.accept();
}

async function api() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView?.renderSponner();
    resulteView.update(model.getSearchREsultsPage());
    bookmarksView.update(model.stats.bookmarks);
    console.log(id);
    await model?.loadRecipe(id);
    console.log(model.stats.recipe);
    recipeView.render(model.stats.recipe);
  } catch (error) {
    recipeView.renderError();
    console.log(error);
  }
}

async function controlSearchResults() {
  try {
    resulteView.renderSponner();
    await model?.searchLoad(searchView.getQuery());
    resulteView.render(model.getSearchREsultsPage());
    paginationView.render(model.stats.search);
  } catch (error) {
    resulteView.renderError();
  }
}
const controlPagination = function (goToPage) {
  resulteView.render(model.getSearchREsultsPage(goToPage));
  paginationView.render(model.stats.search);
};
const controlServings = function (newServisings) {
  model.updateServings(newServisings);
  recipeView.update(model.stats.recipe);
};
const controlAddBookmarl = function () {
  if (model.stats.recipe.bookmared) model.deletBoomark(model.stats.recipe.id);
  else if (!model.stats.recipe.bookmared) model.addbookmark(model.stats.recipe);
  recipeView.update(model.stats.recipe);
  bookmarksView.render(model.stats.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.stats.bookmarks);
};
const controlAddRecipe=async function(newRecipe){
try {
  addRecipeView.renderSponner()

    await model.uploadRecipe(newRecipe);
    recipeView.render(model.stats.recipe);
    window.history.pushState(null,'',`#${model.stats.recipe.id}`)
    addRecipeView.renderMassag()
    console.log(model.stats.bookmarks) 
    bookmarksView.render(model.stats.bookmarks)
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC*1000);
    console.log(MODAL_CLOSE_SEC)
} catch (error) {
  addRecipeView.renderError(error.message)
}
}
function init() {
  bookmarksView.addHandlerREnder(controlBookmarks);
  recipeView.addHandlerRender(api, 'hashchange', 'load');
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addhandlerClik(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmarl);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.addhandlerUploder(controlAddRecipe)
}
init();
// // // https://forkify-api.herokuapp.com/v2

// // ///////////////////////////////////////
