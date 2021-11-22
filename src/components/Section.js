export default class Section {
  constructor({ items, renderer }, containerSelector, api) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  addItem(card) {
    this._container.prepend(card);
  }

  saveItem = (text) => {
    this._api.postNewCard({
      name: text
    })
    .then (data=>{
      this.addItem(data.name);
    })
    .catch(err => {
      console.log(err);
    });
  }

  renderSection() {
    this._initialArray.forEach((element) => {
      this._element = element;
      this._finalCard = this._renderer(this._element); /* api here somehow i guess */
    });
  }
}
