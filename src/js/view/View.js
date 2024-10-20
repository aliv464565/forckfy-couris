import icons from 'url:../../img/icons.svg';

export default class View {
  
  renderError(massage = this._massageError) {
    const error = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${massage}</p>
          </div>`;
    console.log(this._parentElement);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', error);
  }
  
  renderMassag(massage = this._massage) {
    const error = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${massage}</p>
          </div>`;
    console.log(this._parentElement);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', error);
  }
  /**
   * 
   * @param {Object|object[]} data object
   * @param {Boolean} [render=true] به صورت دیفالت true  بر می گرده  
   * @returns {undefined | string} اگر مقدار render=false باشد تابع یه استرینگ برمیگرداند
   * @this {object} View پدرش هست که به عنوان this قابل دسترسی هست
   * @author ali valizaadeh
   * @todo اتمام پروژه
   */
  render(data, render = true) {
    try {
      if (!data || (Array.isArray(data) && data.length === 0))
        return this.renderError();
      this._data = data;
      const html = this._generateMarkup();
      console.log(data);
      if (!render) return html;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', html);
    } catch (error) {
      console.log(error)
    }
    
  }
  update(data) {
    if(!data)return
    this._data = data;
    const html = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(html);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        console.log('a');
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
    console.log(data+"💖💖");
  }
  renderSponner() {
    const markUp = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
