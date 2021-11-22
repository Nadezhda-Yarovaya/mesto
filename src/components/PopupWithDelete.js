import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector,submitDeleteForm }) {
    super({ popupSelector });
    this._submitDeleteForm = submitDeleteForm;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form');
  }

  open(element) {
    this.setEventListeners();
    super.open();
    this._dataObj = element;
    this._cardId= this._dataObj._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitDeleteForm(this._cardId);
      this.close();
    });
  }

}
