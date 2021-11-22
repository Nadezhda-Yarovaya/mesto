export default class Api {
    constructor(config) { 
      this._url = config.baseUrl;
      this._headers=config.headers;
    }


    getProfileInfo() {      
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

    }
    
    _getRequest() {
      return fetch(`${this._url}/cards`, {
        method: "GET", /* по умолчанию, но можно явно показать*/
        headers: this._headers /* да тут нет боди */
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

    }

    getInitialCards() {
      // ...
              /*initial cards fetch и Get rfr cdzpsdftv& */
              /*
      fetch('https://mesto.nomoreparties.co/v1/cohort-30/cards', {
        method: 'GET',
        headers: {
          authorization: 'cd4b9d27-bb3f-46e8-b234-b4266f9e218c' /* уже свой добавила 
        }
      })*/

      /*this method returns me with the response*/
      
        return this._getRequest();
      
      
    }

      postNewCard(newCardData) {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify(newCardData)
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка такова: ${res.status}`);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
      }

      deleteCard(cardId) { /* thisId of Card.js */
        this._id = cardId;        
        return fetch(`${this._url}/cards/${this._id}`, {
          method: "DELETE",
          headers: this._headers /*no body here*/
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка такова: ${res.status}`);
        })
        .catch((err) => {
          console.log('Ошибка такова: ' + err); // выведем ошибку в консоль
        }); 
      }
    
      _saveProfileAll(data, fetchUrl) {
         return fetch(fetchUrl, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(data)
      }
        )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка такова: ${res.status}`);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
      }

      saveProfileData(nameResult, jobResult) {
        return this._saveProfileAll({
            name: nameResult,
            about: jobResult
          }, `${this._url}/users/me`);       
      }

      saveAvatarUrl(avatarUrl) {
        return this._saveProfileAll({
          avatar: avatarUrl
        }, `${this._url}/users/me/avatar`);       
    }

    loadAvatar(){
      return fetch(`${this._url}/users/me`, {
        method: "GET", 
        headers: this._headers 
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
    }

    _likes(methodToUse, cardId) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: methodToUse, 
        headers: this._headers 
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

    }

    putLikes(cardId){
      return this._likes("PUT", cardId);      
    }

    deleteLikes(cardId) {
      return this._likes("DELETE", cardId); 
    }

   
    }
