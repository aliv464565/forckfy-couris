import View from './View';
import PreviewView from './PreviewView';
class BookmarksView extends View {
  _massage = 'Recpie was successfluy uploaded :)';
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHinteWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    console.log('a');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHinteWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addhandlerUploder(handler) {
    try {
      this._parentElement.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.closest('.upload__btn')) {
          const dataArr = [...new FormData(this)];
          const data = Object.fromEntries(dataArr);
          console.log(data);
          handler(data);
        }
      });
    } catch (error) {
      throw error;
    }
  }
  _generateMarkup() {}
}
export default new BookmarksView();
