import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector, submitDeleteForm }) {
    super({ popupSelector });
    this._submitDeleteForm = submitDeleteForm;
    this._form = this._currentPopup.querySelector(".popup__form");
  }

  open(element, cardToDelete) {
    super.open();
    this._dataObj = element;
    this._cardId = this._dataObj._id;
    this._cardToDelete = cardToDelete;
  }

  closeWithRemove() {
    super.close();
    this._cardToDelete.remove();
  }

  renderLoading(buttonText) {
    this._form.querySelector(".popup__submit").value = buttonText;
  }

  _savingData() {
    this._form.querySelector(".popup__submit").value = "Удаление...";
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._savingData();
      this._submitDeleteForm(this._cardId);
    });
  }
}
