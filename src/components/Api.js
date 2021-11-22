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

      postNewCard(newCardData) {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: this._headers,
          body: json.stringify(newCardData)
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
        return fetch(`${this._url}/cards${this._id}`, {
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
          console.log('error this: ' + err); // выведем ошибку в консоль
        }); 
      }
    }
