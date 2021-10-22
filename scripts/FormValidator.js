/*переменные */
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

/*functions*/
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

function isValid(formElement, inputElement, config) {
  /*const inputsList = formElement.querySelectorAll(".popup__input");
  Array.from(inputsList).forEach((element) => {*/
  if (!inputElement.validity.valid) {
    
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const setEventListeners = (formElement, config) => {
  const inputsList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitBut = formElement.querySelector(config.submitButtonSelector);

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const isFormValid = formElement.checkValidity();
      isValid(formElement, inputElement, config);
      toggleButtonState(submitBut, isFormValid, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
};

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
};

// MAIN function to enable Validation
function enableValidation(config) {
  // ищем ВСЕ формы в документе
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //назначим слушателей на все формы
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Вызовем функцию
enableValidation(validationConfig);

export {validationConfig, showInputError, hideInputError, isValid, setEventListeners, toggleButtonState, enableValidation};