const flipper = (function () {
  const btnAuth = document.querySelector('.welcome__auth');
  const flipContainer = document.querySelector('.flip-container');
  const btnBack = document.querySelector('.btn_auth');
  const overlay = document.querySelector('.welcome-overlay');

  btnAuth.addEventListener('click', function () {
    flipContainer.classList.toggle('flip');
  });

  btnBack.addEventListener('click', function () {
    flipContainer.classList.toggle('flip');
  });

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      if (flipContainer.classList.contains('flip')) {
        flipContainer.classList.remove('flip');
      }
    }
  });

  overlay.addEventListener('click', function () {
    if (flipContainer.classList.contains('flip')) {
      flipContainer.classList.remove('flip');
    }
  });

}());

module.exports = flipper;