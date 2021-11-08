  export default class UserInfo {
  constructor(nameSelector, jobSelector) { /* селекторы!! 
    Конструктор данного класса в виде аргументов должен принимать селекторы элемента имени пользователя и профессии на странице.
    */
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
  }

  getUserInfo() { /*Данный метод должен возвращать объект с данными о пользователе.*/
    this._userData = {};
    this._userData.profileName = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }
  /*returns result from the page, inserts to the form*/

  setUserInfo(userName, userJob) { 
    /*Данный метод должен принимать 2 аргумента — имя пользователя и профессию и 
    именно они должны использоваться для установки на странице.*/
    /*userName and userJob are given, values*/
    this._thisObject = this.getUserInfo(); /* result is profile from the page */
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}
