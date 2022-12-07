const callbackModal = document.querySelector('.callback');
const callbackContentContainer = callbackModal.querySelector('.modal__content-container');
const callbackSuccessContainer = callbackModal.querySelector('.modal__success-container');
const modalCallbackForm = callbackModal.querySelector('.modal__form');
const phoneInputItem = callbackModal.querySelector('.modal__input-phone');
const submitButton = callbackModal.querySelector('.modal__submit');
const inputCheckItem = callbackModal.querySelector('.modal__input-phone-valid-icon');

const openCallbackModal = () => {
  callbackModal.classList.add('callback_active');
  callbackModal.addEventListener("click", handleCloseCallbackModal);

  callbackContentContainer.classList.contains('modal__content-container_hidden') && callbackContentContainer.classList.remove('modal__content-container_hidden');
  callbackSuccessContainer.classList.contains('modal__success-container_visible') && callbackSuccessContainer.classList.remove('modal__success-container_visible');
};

const handleCloseCallbackModal = (e) => {
  if (e.target.classList.contains('close-button')) {
    closeCallbackModal();
    callbackModal.removeEventListener("click", handleCloseCallbackModal);
  }
  if (e.target.classList.contains('callback_active')) {
    closeCallbackModal();
    callbackModal.removeEventListener("click", handleCloseCallbackModal);
  }
}

const closeCallbackModal = () => {
  callbackModal.classList.remove("callback_active");
};

function handleCallbackSubmit(e) {
  e.preventDefault();
  callbackContentContainer.classList.add('modal__content-container_hidden');
  callbackSuccessContainer.classList.add('modal__success-container_visible');
};

var phoneInputs = document.querySelectorAll('.modal__input-phone');

var getInputNumbersValue = function (input) {
  // Return stripped input value — just numbers
  return input.value.replace(/\D/g, '');
}

var onPhonePaste = function (e) {
  var input = e.target,
    inputNumbersValue = getInputNumbersValue(input);
  var pasted = e.clipboardData || window.clipboardData;
  if (pasted) {
    var pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
      // formatting will be in onPhoneInput handler
      input.value = inputNumbersValue;
      return;
    }
  }
}

var onPhoneInput = function (e) {
  var input = e.target,
    inputNumbersValue = getInputNumbersValue(input),
    selectionStart = input.selectionStart,
    formattedInputValue = "";

  let regexPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  if (!inputNumbersValue) {
    return input.value = "";
  }

  if (input.value.length != selectionStart) {
    // Editing in the middle of input, not last symbol
    if (e.data && /\D/g.test(e.data)) {
      // Attempt to input non-numeric symbol
      input.value = inputNumbersValue;
    }
    return;
  }

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
    var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
    formattedInputValue = input.value = firstSymbols + " ";
    if (inputNumbersValue.length > 1) {
      formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
  }
  input.value = formattedInputValue;

  if (!regexPhone.test(formattedInputValue)) {
    submitButton.disabled = true;
    if (phoneInputItem.classList.contains('modal__input_valid')) {
      phoneInputItem.classList.remove('modal__input_valid');
      inputCheckItem.classList.remove('modal__input-phone-valid-icon_active');
    };
    phoneInputItem.classList.remove
  } else {
    submitButton.disabled = false;
    phoneInputItem.classList.add('modal__input_valid');
    inputCheckItem.classList.add('modal__input-phone-valid-icon_active');
  };
}
var onPhoneKeyDown = function (e) {
  // Clear input after remove last symbol
  var inputValue = e.target.value.replace(/\D/g, '');
  if (e.keyCode == 8 && inputValue.length == 1) {
    e.target.value = "";
  }
}
for (var phoneInput of phoneInputs) {
  phoneInput.addEventListener('keydown', onPhoneKeyDown);
  phoneInput.addEventListener('input', onPhoneInput, false);
  phoneInput.addEventListener('paste', onPhonePaste, false);
}

modalCallbackForm.addEventListener("submit", handleCallbackSubmit);