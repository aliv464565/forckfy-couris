import View from "./View";
import PreviewView from "./PreviewView";
class resulteView extends View {
  _parentElement = document.querySelector('.results');
  _massageError = 'No rexipes found for your query! please try again ';
  _massage;
  _data;
  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join(' ');
  }
}
export default new resulteView()