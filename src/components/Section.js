export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(card) {
    this._container.prepend(card);
  }

  renderSection() {
    this._initialArray.forEach((element) => {
      this._element = element;
      this._finalCard = this._renderer(this._element);
    });
  }
}
