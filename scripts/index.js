/*объявляю переменные  */
const popup = document.querySelector(".popup");
const openChngBtn =  document.querySelector(".profile__edit-btn"); 
const closePopupBtn = document.querySelector(".popup__close-btn"); 
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
  let nameInput = document.querySelector(".profile__name"); 
  let jobInput = document.querySelector(".profile__job");
  let nameResult = popup.querySelector(".popup_type_name");
  let jobResult = popup.querySelector(".popup_type_job");
  nameInput.textContent = nameResult.value;
  jobInput.textContent = jobResult.value;
  formToggle();
}

function likeToggle(event) {
  let likeActv = event.currentTarget;
  likeActv.classList.toggle("elements__like_active");
}

/*вешаю все функции на события теперь */
openChngBtn.addEventListener("click", formToggle);
closePopupBtn.addEventListener("click", formToggle);
popup.addEventListener("click", clickOutsd);
formElement.addEventListener("submit", formSubmitHandler);

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", likeToggle);
}

