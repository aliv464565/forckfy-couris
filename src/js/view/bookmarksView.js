import View from './View';
import PreviewView from './PreviewView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _massageError = 'No rexipes found for your query! please try again ';
  _massage;
  _data;
  addHandlerREnder(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join(' ');
  }
}
export default new BookmarksView();
