const toggleButtonStatus = (form, inputList, buttonClass) => {
  const buttonElement = form.querySelector(buttonClass);
  if (inputList.some((input) => input.validity.valid !== true)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}
const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.inputErrorTextClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешена только латиница, кириллица и тире с пробелами.");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);

  } else {
    hideInputError(formElement, inputElement, config);

  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(form => setEventListeners(form, config));
};

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      toggleButtonStatus(form, inputList, config.submitButtonSelector);
    })
  })
}
const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonStatus(formElement, inputList, config.submitButtonSelector);
};



export { enableValidation, clearValidation };
