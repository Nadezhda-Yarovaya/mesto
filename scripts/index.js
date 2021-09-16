/*объявляю переменные  */
const popup = document.querySelector(".popup");
const openChngBtn =  document.querySelector(".profile__edit"); 
const closePopupBtn = document.querySelector(".popup__close"); 
const formElement = document.querySelector(".popup__form");
const like = document.querySelectorAll(".elements__like");

/*прописываю функции*/
function formToggle() {
  popup.classList.toggle("popup_opened");
}

function clickOutsd(event) {
  if (event.target === event.currentTarget) {
    formToggle();
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  let nameInput = document.querySelector(".profile__title"); 
  let jobInput = document.querySelector(".profile__subtitle");
  let result1 = popup.querySelector("#pop-up-author");
  let result2 = popup.querySelector("#pop-up-who");
  nameInput.textContent = result1.value;
  jobInput.textContent = result2.value;
  formToggle();
}

function likeToggle(event) {
  let likeActv = event.currentTarget.querySelector(".elements__likeimg");
  likeActv.classList.toggle("elements__likeimg_active");
}

/*вешаю все функции на события теперь */
openChngBtn.addEventListener("click", formToggle);
closePopupBtn.addEventListener("click", formToggle);
popup.addEventListener("click", clickOutsd);
formElement.addEventListener("submit", formSubmitHandler);

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", likeToggle);
}
