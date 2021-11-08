export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /*Данный метод должен принимать в виде аргумента карточку, которую следует добавить в DOM. 
  Свойство this._finalCard вообще не нужно.
  */
  addItem(card) {
    this._container.prepend(card);
  }

  renderSection() {
    this._initialArray.forEach((element) => {
      this._element = element;
      this._finalCard = this._renderer(this._element);
       /*
      this.addItem(this._finalCard);
      Передаваемый в конструктор класса renderer внутри себя должен содержать функционал добавления карточки в DOM. 
      Текущую строку следует удалить.
      */
    });
  }
}
