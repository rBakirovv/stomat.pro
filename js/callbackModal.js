const callbackModal = document.querySelector('.callback');
const callbackContentContainer = callbackModal.querySelector('.modal__content-container');
const callbackSuccessContainer = callbackModal.querySelector('.modal__success-container');
const modalCallbackForm = callbackModal.querySelector('.modal__form');
const phoneInputCallbackItem = callbackModal.querySelector('.modal__input-phone');
const nameInputCallbackItem = callbackModal.querySelector('.modal__input-name');
const submitCallbackButton = callbackModal.querySelector('.modal__submit');
const inputCallbackCheckItem = callbackModal.querySelector('.modal__input-phone-valid-icon');

const nameRegex = /^[А-Яа-яa-zA-Z- ]{1,30}$/;
const regexPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

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

  // Валиден ли инпут имени
  if (!nameRegex.test(nameInputCallbackItem.value)) {
    if (callbackModal.querySelector('.modal__input-name').classList.contains('modal__input_valid')) {
      callbackModal.querySelector('.modal__input-name').classList.remove('modal__input_valid');
      callbackModal.querySelector('.modal__input-name-valid-icon').classList.remove('modal__input-name-valid-icon_active');
    }

    callbackModal.querySelector('.modal__input-name').classList.add('modal__input_no-valid');
    callbackModal.querySelector('.modal__input-name-no-valid-icon').classList.add('modal__input-name-no-valid-icon_active');
  };

  // Валиден ли инпут телефона
  if (!callbackModal.querySelector('.modal__input-phone').classList.contains('modal__input_valid')) {
    if (callbackModal.querySelector('.modal__input-phone').classList.contains('modal__input_valid')) {
      callbackModal.querySelector('.modal__input-phone').classList.remove('modal__input_valid');
      callbackModal.querySelector('.modal__input-phone-valid-icon').classList.remove('modal__input-phone-valid-icon_active');
    }

    callbackModal.querySelector('.modal__input-phone').classList.add('modal__input_no-valid');
    callbackModal.querySelector('.modal__input-phone-no-valid-icon').classList.add('modal__input-phone-no-valid-icon_active');
  };

  if (nameRegex.test(nameInputCallbackItem.value) && callbackModal.querySelector('.modal__input-phone').classList.contains('modal__input_valid')) {
    callbackModal.querySelector('.loader').classList.add('loader_active');

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '../ajax.php', true);

    xhr.send(callbackModal.querySelector('.modal__input-phone').value);

    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.log(xhr.status);
        return;
      };

      ComagicWidget.sitePhoneCall({
        captcha_key: '',
        captcha_value: '',
        phone: callbackModal.querySelector(".modal__input-phone").value,
        group_id: '343750'
      }, function (resp) {
        console.log(resp)
      });

      callbackModal.querySelector('.loader').classList.remove('loader_active');
      callbackContentContainer.classList.add('modal__content-container_hidden');
      callbackSuccessContainer.classList.add('modal__success-container_visible');

      const callbackModalInputs = modalCallbackForm.querySelectorAll('.modal__input');

      for (let callbackModalItemInput of callbackModalInputs) {
        callbackModalItemInput.value = "";
      };

      callbackModal.querySelector('.modal__input-phone').classList.remove('modal__input_valid');
      callbackModal.querySelector('.modal__input-phone-valid-icon').classList.remove('modal__input-phone-valid-icon_active');

      callbackModal.querySelector('.modal__input-name').classList.remove('modal__input_valid');
      callbackModal.querySelector('.modal__input-name-valid-icon').classList.remove('modal__input-name-valid-icon_active');
    };

    xhr.onprogress = () => {
      callbackModal.querySelector('.loader').classList.add('loader_active');
    };

    xhr.onerror = () => {
      callbackModal.querySelector('.loader').classList.remove('loader_active');
      console.log(xhr.response)
    };
  }
};

var phoneInputs = callbackModal.querySelectorAll('.modal__input-phone');

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

  var firstSymbols = "+7";
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

  input.value = formattedInputValue;

  if (!regexPhone.test(formattedInputValue)) {
    if (phoneInputCallbackItem.classList.contains('modal__input_valid')) {
      phoneInputCallbackItem.classList.remove('modal__input_valid');
      inputCallbackCheckItem.classList.remove('modal__input-phone-valid-icon_active');
    };
    phoneInputCallbackItem.classList.remove
  } else {
    phoneInputCallbackItem.classList.add('modal__input_valid');
    inputCallbackCheckItem.classList.add('modal__input-phone-valid-icon_active');

    callbackModal.querySelector('.modal__input-phone').classList.remove('modal__input_no-valid');
    callbackModal.querySelector('.modal__input-phone-no-valid-icon').classList.remove('modal__input-phone-no-valid-icon_active');
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
};

phoneInputCallbackItem.addEventListener("click", () => {
  if (phoneInputCallbackItem.value === "") {
    phoneInputCallbackItem.value = "+7";
  }
});

nameInputCallbackItem.addEventListener('input', (e) => {
  if (nameRegex.test(e.target.value)) {
    callbackModal.querySelector('.modal__input-name').classList.add('modal__input_valid');
    callbackModal.querySelector('.modal__input-name-valid-icon').classList.add('modal__input-name-valid-icon_active');
  };

  if (callbackModal.querySelector('.modal__input-name').classList.contains('modal__input_no-valid')) {
    callbackModal.querySelector('.modal__input-name').classList.remove('modal__input_no-valid');
    callbackModal.querySelector('.modal__input-name-no-valid-icon').classList.remove('modal__input-name-no-valid-icon_active');
  };
});

modalCallbackForm.addEventListener("submit", handleCallbackSubmit);