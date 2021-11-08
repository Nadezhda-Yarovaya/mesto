  export default class UserInfo {
  constructor(nameSelector, jobSelector) { 
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.profileName = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  setUserInfo(userName, userJob) { 
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}
