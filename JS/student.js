
const imageContainers = document.querySelectorAll('.image-container');


imageContainers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    const message = container.querySelector('.hover-message');

   
    message.style.opacity = 1;
  });

  container.addEventListener('mouseleave', () => {
    const message = container.querySelector('.hover-message');

    message.style.opacity = 0;
  });
});
