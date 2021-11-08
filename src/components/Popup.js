export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._currentPopup = document.querySelector(this._popupSelector);
    this._closeByEscBind = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._currentPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscBind);
  }

  close() {
    this._currentPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscBind);
  }

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
