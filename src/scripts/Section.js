import {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  nameResult,
  jobResult,
  nameInput,
  jobInput,
} from "./index.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem() {
    this._container.prepend(this._finalCard);
  }

  renderSection() {
    this._initialArray.forEach((element) => {
      this._element = element;
      this._finalCard = this._renderer(this._element);
      this.addItem(this._finalCard);
    });
  }
}
