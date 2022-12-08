const orderModal = document.querySelector('.order');
const orderContentContainer = orderModal.querySelector('.modal__content-container');
const orderSuccessContainer = orderModal.querySelector('.modal__success-container');
const modalOrderForm = orderModal.querySelector('.modal__form');
const phoneInputOrderItem = orderModal.querySelector('.modal__input-phone');
const submitOrderButton = orderModal.querySelector('.modal__submit');
const inputOrderCheckItem = orderModal.querySelector('.modal__input-phone-valid-icon');

// выбрать кол-во

const chooseMedicineQuantity = document.querySelector('.medicine__button-choose');
const chooseMedicineQuantityButton = document.querySelector('.medicine__button-number');

// кол-во штук
const inputNumberElement = document.querySelector('.medicine__number-input');

// + 1

function increment() {
  inputNumberElement.value = parseInt(inputNumberElement.value) + 1;
};

// - 1

function decrement() {
  inputNumberElement.value = inputNumberElement.value - 1;

  if (inputNumberElement.value < 1) {
    inputNumberElement.value = 1;
  };
};

function toggleNumberSelection() {
  chooseMedicineQuantity.classList.add('medicine__button-choose_hidden');
  chooseMedicineQuantityButton.classList.add('medicine__button-number_visible');
}

const openOrderModal = () => {
  orderModal.classList.add('order_active');
  orderModal.addEventListener("click", handleCloseOrderModal);

  orderContentContainer.classList.contains('modal__content-container_hidden') && orderContentContainer.classList.remove('modal__content-container_hidden');
  orderContentContainer.classList.contains('modal__success-container_visible') && orderContentContainer.classList.remove('modal__success-container_visible');
};

const handleCloseOrderModal = (e) => {
  if (e.target.classList.contains('close-button')) {
    closeOrderModal();
    orderModal.removeEventListener("click", handleCloseOrderModal);
  }
  if (e.target.classList.contains('order_active')) {
    closeOrderModal();
    orderModal.removeEventListener("click", handleCloseOrderModal);
  }
}

const closeOrderModal = () => {
  orderModal.classList.remove("order_active");
};

function handleOrderSubmit(e) {
  e.preventDefault();
  orderContentContainer.classList.add('modal__content-container_hidden');
  orderSuccessContainer.classList.add('modal__success-container_visible');
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
    submitOrderButton.disabled = true;
    if (phoneInputOrderItem.classList.contains('modal__input_valid')) {
      phoneInputOrderItem.classList.remove('modal__input_valid');
      inputOrderCheckItem.classList.remove('modal__input-phone-valid-icon_active');
    };
    phoneInputOrderItem.classList.remove
  } else {
    submitOrderButton.disabled = false;
    phoneInputOrderItem.classList.add('modal__input_valid');
    inputOrderCheckItem.classList.add('modal__input-phone-valid-icon_active');
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

inputNumberElement.addEventListener("change", (e) => {
  if (e.target.value < 0) {
    inputNumberElement.value = 1;
  };
});

modalOrderForm.addEventListener("submit", handleOrderSubmit);