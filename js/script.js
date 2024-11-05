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
});
