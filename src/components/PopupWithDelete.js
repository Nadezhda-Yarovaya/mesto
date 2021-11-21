import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector,submitDeleteForm }) {
    super({ popupSelector });
    this._submitDeleteForm = submitDeleteForm;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form');
  }

  open() {
    this.setEventListeners();
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitDeleteForm();
      this.close();
    });
  }

}
