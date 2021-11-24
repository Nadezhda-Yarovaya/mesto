export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector, profileData) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
    this._avatar = document.querySelector(this._avatarSelector);
    this._profileData = profileData;
  }

  getUserInfo() {
    this._userData = {};
    this._userData.profileName = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  applyInitialLoad() {
    this._name.textContent = this._profileData.name;
    this._job.textContent = this._profileData.about;
    this._avatar.src = this._profileData.avatar;
  }

  setUserInfo(userName, userJob) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}
