const orderModal = document.querySelector('.order');
const orderContentContainer = orderModal.querySelector('.modal__content-container');
const orderSuccessContainer = orderModal.querySelector('.modal__success-container');
const modalOrderForm = orderModal.querySelector('.modal__form');
const phoneInputOrderItem = orderModal.querySelector('.modal__input-phone');
const nameInputOrderItem = orderModal.querySelector('.modal__input-name');
const submitOrderButton = orderModal.querySelector('.modal__submit');
const inputOrderCheckItem = orderModal.querySelector('.modal__input-phone-valid-icon');

const nameRegexOrder = /^[А-Яа-яa-zA-Z- ]{1,30}$/;
const regexPhoneOrder = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

// выбрать кол-во

const chooseMedicineQuantity = document.querySelector('.medicine__button-choose');
const chooseMedicineQuantityButton = document.querySelector('.medicine__button-number');

// кол-во штук
const inputNumberElement = document.querySelector('.medicine__number-input');

// + 1

function increment() {
  inputNumberElement.value = parseInt(inputNumberElement.value) + 1;

  document.getElementById('total-price').textContent = inputNumberElement.value * 7500;
  document.getElementById('total-price-mobile').textContent = inputNumberElement.value * 7500;
};

// - 1

function decrement() {
  inputNumberElement.value = inputNumberElement.value - 1;

  if (inputNumberElement.value < 1) {
    inputNumberElement.value = 1;
  };

  document.getElementById('total-price').textContent = inputNumberElement.value * 7500;
  document.getElementById('total-price-mobile').textContent = inputNumberElement.value * 7500;
};

/*
function toggleNumberSelection() {
  chooseMedicineQuantity.classList.add('medicine__button-choose_hidden');
  chooseMedicineQuantityButton.classList.add('medicine__button-number_visible');
}
*/

const openOrderModal = () => {
  orderModal.classList.add('order_active');
  orderModal.addEventListener("click", handleCloseOrderModal);

  orderContentContainer.classList.contains('modal__content-container_hidden') && orderContentContainer.classList.remove('modal__content-container_hidden');
  orderSuccessContainer.classList.contains('modal__success-container_visible') && orderSuccessContainer.classList.remove('modal__success-container_visible');
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

  // Валиден ли инпут имени
  if (!nameRegexOrder.test(nameInputOrderItem.value)) {
    if (orderModal.querySelector('.modal__input-name').classList.contains('modal__input_valid')) {
      orderModal.querySelector('.modal__input-name').classList.remove('modal__input_valid');
      orderModal.querySelector('.modal__input-name-valid-icon').classList.remove('modal__input-name-valid-icon_active');
    }

    orderModal.querySelector('.modal__input-name').classList.add('modal__input_no-valid');
    orderModal.querySelector('.modal__input-name-no-valid-icon').classList.add('modal__input-name-no-valid-icon_active');
  };

  // Валиден ли инпут телефона
  if (!orderModal.querySelector('.modal__input-phone').classList.contains('modal__input_valid')) {
    if (orderModal.querySelector('.modal__input-phone').classList.contains('modal__input_valid')) {
      orderModal.querySelector('.modal__input-phone').classList.remove('modal__input_valid');
      orderModal.querySelector('.modal__input-phone-valid-icon').classList.remove('modal__input-phone-valid-icon_active');
    }

    orderModal.querySelector('.modal__input-phone').classList.add('modal__input_no-valid');
    orderModal.querySelector('.modal__input-phone-no-valid-icon').classList.add('modal__input-phone-no-valid-icon_active');
  };

  if (nameRegexOrder.test(nameInputOrderItem.value) && orderModal.querySelector('.modal__input-phone').classList.contains('modal__input_valid')) {
    orderModal.querySelector('.loader').classList.add('loader_active');

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '../ajax.php', true);

    xhr.send(orderModal.querySelector('.modal__input-phone').value);

    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.log(xhr.status);
        return;
      };

      ComagicWidget.sitePhoneCall({
        captcha_key: '',
        captcha_value: '',
        phone: orderModal.querySelector(".modal__input-phone").value,
        group_id: '343750'
      }, function (resp) {
        console.log(resp)
      });

      orderModal.querySelector('.loader').classList.remove('loader_active');
      orderContentContainer.classList.add('modal__content-container_hidden');
      orderSuccessContainer.classList.add('modal__success-container_visible');

      inputNumberElement.value = 1;

      const orderModalInputs = modalOrderForm.querySelectorAll('.modal__input');

      for (let orderModalItemInput of orderModalInputs) {
        orderModalItemInput.value = "";
      };

      orderModal.querySelector('.modal__input-phone').classList.remove('modal__input_valid');
      orderModal.querySelector('.modal__input-phone-valid-icon').classList.remove('modal__input-phone-valid-icon_active');

      orderModal.querySelector('.modal__input-name').classList.remove('modal__input_valid');
      orderModal.querySelector('.modal__input-name-valid-icon').classList.remove('modal__input-name-valid-icon_active');
    };

    xhr.onprogress = () => {
      orderModal.querySelector('.loader').classList.add('loader_active');
    };

    xhr.onerror = () => {
      orderModal.querySelector('.loader').classList.remove('loader_active');
      console.log(xhr.response)
    };
  }
};

var phoneInputs = orderModal.querySelectorAll('.modal__input-phone');

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

  if (!regexPhoneOrder.test(formattedInputValue)) {
    if (phoneInputOrderItem.classList.contains('modal__input_valid')) {
      phoneInputOrderItem.classList.remove('modal__input_valid');
      inputOrderCheckItem.classList.remove('modal__input-phone-valid-icon_active');
    };
    phoneInputOrderItem.classList.remove
  } else {
    phoneInputOrderItem.classList.add('modal__input_valid');
    inputOrderCheckItem.classList.add('modal__input-phone-valid-icon_active');

    orderModal.querySelector('.modal__input-phone').classList.remove('modal__input_no-valid');
    orderModal.querySelector('.modal__input-phone-no-valid-icon').classList.remove('modal__input-phone-no-valid-icon_active');
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

inputNumberElement.addEventListener("change", (e) => {
  if (e.target.value < 0) {
    inputNumberElement.value = 1;
  };
});

phoneInputOrderItem.addEventListener("click", () => {
  if (phoneInputOrderItem.value === "") {
    phoneInputOrderItem.value = "+7";
  }
});

nameInputOrderItem.addEventListener('input', (e) => {
  if (nameRegexOrder.test(e.target.value)) {
    orderModal.querySelector('.modal__input-name').classList.add('modal__input_valid');
    orderModal.querySelector('.modal__input-name-valid-icon').classList.add('modal__input-name-valid-icon_active');
  };

  if (orderModal.querySelector('.modal__input-name').classList.contains('modal__input_no-valid')) {
    orderModal.querySelector('.modal__input-name').classList.remove('modal__input_no-valid');
    orderModal.querySelector('.modal__input-name-no-valid-icon').classList.remove('modal__input-name-no-valid-icon_active');
  };
});

modalOrderForm.addEventListener("submit", handleOrderSubmit);