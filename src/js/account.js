document.addEventListener('DOMContentLoaded', function () {
  const selectButton = document.querySelector('.select-button');
  const selectDropdown = document.querySelector('.select-dropdown');
  const selectedValue = document.querySelector('.selected-value');

  // Toggle dropdown visibility and button active class
  selectButton.addEventListener('click', function (event) {
    event.preventDefault(); // Отменяет стандартное действие кнопки
    const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
    selectButton.setAttribute('aria-expanded', !isExpanded);
    selectDropdown.classList.toggle('active');
    selectButton.classList.toggle('active'); // Добавляем или удаляем активный класс
  });

  // Handle option selection
  selectDropdown.addEventListener('click', function (event) {
    event.preventDefault(); // Отменяет стандартное действие клика по элементам списка
    const option = event.target.closest('li');
    if (option) {
      const content = option
        .querySelector('.account__select-content')
        .cloneNode(true);
      selectedValue.innerHTML = '';
      selectedValue.appendChild(content);

      // Close the dropdown and remove active class from the button
      selectDropdown.classList.remove('active');
      selectButton.setAttribute('aria-expanded', 'false');
      selectButton.classList.remove('active'); // Удаляем активный класс после выбора опции
    }
  });

  // Close dropdown and remove active class when clicking outside
  document.addEventListener('click', function (event) {
    if (
      !selectButton.contains(event.target) &&
      !selectDropdown.contains(event.target)
    ) {
      selectDropdown.classList.remove('active');
      selectButton.setAttribute('aria-expanded', 'false');
      selectButton.classList.remove('active'); // Удаляем активный класс при клике вне
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Получаем все input элементы внутри .account__form-labels
  const inputs = document.querySelectorAll('.account__form-labels input');

  // Функция для проверки и применения стилей
  function updateInputStyles() {
    inputs.forEach(input => {
      if (input.value.trim() !== '') {
        input.classList.add('active'); // Добавляем класс если input не пустой
      } else {
        input.classList.remove('active'); // Удаляем класс если input пустой
      }
    });
  }

  // Применяем стили при загрузке страницы
  updateInputStyles();

  // Применяем стили при изменении значений в input
  inputs.forEach(input => {
    input.addEventListener('input', updateInputStyles);
  });
});

// МАСКА ДЛЯ ИНПУТА
document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.querySelector('.js-account__form-input');

  // Функция для форматирования и установки маски
  function formatPhoneInput(value) {
    let input = value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    let formattedInput = '+7 (';

    if (input.length > 1) {
      formattedInput += input.substring(1, 4);
    }
    if (input.length >= 5) {
      formattedInput += ') ' + input.substring(4, 7);
    }
    if (input.length >= 8) {
      formattedInput += '-' + input.substring(7, 9);
    }
    if (input.length >= 10) {
      formattedInput += '-' + input.substring(9, 11);
    }

    return formattedInput;
  }

  // Применение маски при фокусировке на input
  phoneInput.addEventListener('focus', function () {
    if (phoneInput.value.trim() === '') {
      phoneInput.value = '+7 (';
      phoneInput.classList.add('active');
    }
  });

  // Применение маски при вводе
  phoneInput.addEventListener('input', function () {
    phoneInput.value = formatPhoneInput(phoneInput.value);
  });

  // Убираем нежелательные символы
  phoneInput.addEventListener('keydown', function (event) {
    const key = event.key;
    if (
      !/[0-9]/.test(key) &&
      key !== 'Backspace' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight'
    ) {
      event.preventDefault();
    }
  });
});

const player = new Plyr('#player');
