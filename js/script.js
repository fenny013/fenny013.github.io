document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");

  // Обработчик события движения мыши
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`; // Установка вертикальной позиции
    cursor.style.left = `${e.clientX}px`; // Установка горизонтальной позиции
  });

  // Следим за наведением на кнопки
  document.querySelectorAll(".cta-button, .contact-info a").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      cursor.classList.add("hover"); // Добавляем класс при наведении
    });
    button.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover"); // Убираем класс, когда убрали наведение
    });
  });

  document.addEventListener("click", (e) => {
    // Создаем элемент для расходящегося контура
    const expandingCircle = document.createElement("div");
    expandingCircle.classList.add("expanding-circle");

    // Устанавливаем позицию контура
    expandingCircle.style.left = `${e.clientX}px`;
    expandingCircle.style.top = `${e.clientY}px`;

    // Добавляем элемент к body
    document.body.appendChild(expandingCircle);

    // Удаляем элемент после завершения анимации
    expandingCircle.addEventListener("animationend", () => {
      expandingCircle.remove();
    });
  });

  // Проверка сохраненного языка в cookies при загрузке страницы
  const savedLang = getCookie('language') || 'en'; // По умолчанию английский, если нет cookies
  console.log(`Загружен язык: ${savedLang}`);
  setLanguage(savedLang);

  // Проверка согласия на использование cookies при загрузке страницы
  if (!checkCookieConsent()) {
    console.log("Согласие на cookies не найдено. Показываем баннер.");
    document.getElementById("cookie-banner").style.display = 'block';
  } else {
    console.log("Согласие на cookies уже дано ранее. Баннер скрыт.");
  }

  document.getElementById("accept-cookies").addEventListener("click", () => {
    setCookieConsent(true);
  });

  document.getElementById("decline-cookies").addEventListener("click", () => {
    setCookieConsent(false);
  });
});

// Функция установки cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
  console.log(`Cookie установлено: ${name}=${value}; ${expires}; path=/`);
}

// Функция получения значения cookies по имени
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(';').shift();
    console.log(`Cookie найдено: ${name}=${cookieValue}`);
    return cookieValue;
  }
  console.log(`Cookie не найдено: ${name}`);
  return null;
}

// Функция установки языка и сохранения его в cookies
function setLanguage(lang) {
  document.querySelectorAll('[data-en], [data-ru]').forEach(element => {
    element.textContent = element.getAttribute(`data-${lang}`);
  });
  setCookie('language', lang, 7); // Сохранение предпочтений языка на 7 дней
}

// Функция проверки наличия cookies согласия
function checkCookieConsent() {
  const consent = getCookie('cookiesAccepted') === 'true';
  console.log(`Проверка согласия на cookies: ${consent ? "дано" : "не дано"}`);
  return consent;
}

// Установка cookies согласия
function setCookieConsent(accepted) {
  setCookie('cookiesAccepted', accepted ? 'true' : 'false', 30); // Срок хранения 30 дней
  console.log(`Согласие на cookies установлено: ${accepted}`);
  document.getElementById("cookie-banner").style.display = 'none';
}
document.addEventListener('click', function (event) {
  const rippleCircle = document.createElement('div');
  rippleCircle.classList.add('ripple-circle');

  // Установите позицию круга в месте клика
  rippleCircle.style.left = `${event.clientX - 10}px`; // центрирует круг по оси X
  rippleCircle.style.top = `${event.clientY - 10}px`;  // центрирует круг по оси Y

  document.getElementById('animation-container').appendChild(rippleCircle);

  // Удаление элемента после завершения анимации
  rippleCircle.addEventListener('animationend', () => {
    rippleCircle.remove();
  });
});

document.addEventListener('dblclick', function (event) {
  event.preventDefault(); // Предотвращает выделение текста при двойном клике
});

// Отключение контекстного меню
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Отключение выделения текста
document.addEventListener('selectstart', function(event) {
  event.preventDefault();
});

// Отключение перетаскивания
document.addEventListener('dragstart', function(event) {
  event.preventDefault();
});

// Отключение двойного клика для предотвращения выделения текста
document.addEventListener('mousedown', function(event) {
  if (event.detail > 1) {
    event.preventDefault();
  }
}, false);

// Отключение сочетаний клавиш (например, Ctrl+S, Ctrl+U)
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey && (event.key === 's' || event.key === 'u' || event.key === 'p')) || event.key === 'F12') {
    event.preventDefault();
  }
});
