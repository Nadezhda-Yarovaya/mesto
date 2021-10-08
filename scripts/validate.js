/* мне формы по сути не нужны, ищут по array from и селектору 
на 8 10 все работает, только ссылку надо проверять плюс серый цвет всего */
const editForm=document.forms.editform;
/*
const inputName = editForm.elements.name;
const inputTitle =editForm.elements.title;*/

/* another form to add new place */
const newPlaceForm = document.forms.newplaceform;
/*
const inputPlaceName = newPlaceForm.elements.placeName;
const inputUrl = newPlaceForm.elements.url;*/


  function showInputError(formElement, inputElement, errorMessage) {
    const errorPlacer = formElement.querySelector(`.${inputElement.id}-error`);
    errorPlacer.textContent = errorMessage;    
    errorPlacer.classList.add('popup__input-error_active');
  }

  function hideInputError(formElement, inputElement) {
      
    const errorPlacer = formElement.querySelector(`.${inputElement.id}-error`);
    errorPlacer.classList.remove('popup__input-error_active');
    errorPlacer.textContent ='';

}

function isValid(formElement, inputElement) { /*два пар-ра - 1й - название формы, а 2й - название элемента который проверяем */
if (!inputElement.validity.valid) { /* says it's undefined */
    showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
    hideInputError(formElement, inputElement);
}
}

  
const setEventListeners = (formElement) => { /*беру форму и в ней нахожу все инпуты */
    const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
      inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        /*console.log(formElement + 'inp' + inputElement);*/
        isValid(formElement, inputElement);
      });
    });
  }; 

  
function enableValidation() { /* найдет и переберет все формы в документе */

/* передать объекты в аргументы функции {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}*/

    const formList = Array.from(document.querySelectorAll('.popup__form')); /* нашли все формы */
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement); /*назначим слушателя на все (элемнты) формы */
    });
  };
  
  // Вызовем функцию
  enableValidation();