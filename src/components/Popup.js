export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._currentPopup = document.querySelector(this._popupSelector);
    this._escape = function(evt) {
      this._handleEscClose(evt);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._currentPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escape);
  }

  close() {
    this._currentPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escape);
  }
  /*Данный слушатель не будет удаляться, так как для успешного удаления  слушателя при установке и при удалении следует использовать одну и ту же именованную функцию.
   Сейчас же при установке используется анонимная стрелочная.*/

  setEventListeners() {
    this._currentPopup
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        this.close();
      });

    this._currentPopup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
