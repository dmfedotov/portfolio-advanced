export default (function () {

  // Стрелок навигации
  const _scrollArrowDown = $('#scroll-down');
  const _scrollArrowUp = $('#scroll-up');

  
  // Функция принимает элемент, к которому нужно проскролить вниз
  function _scrollBottom(section) {
    _scrollArrowDown.click(function (e) {
      e.preventDefault();

      // Позиция элемента сверху
      var _sectionTopOffset = $(section).offset().top;
      console.log(_sectionTopOffset);

      $('body,html').animate({
        scrollTop: _sectionTopOffset,
      }, 700);
    });
  }

  
  // Функция делает прокрутку к верху страницы
  function _scrollTop() {
    _scrollArrowUp.click(function (e) {
      e.preventDefault();

      $('body,html').animate({
        scrollTop: 0,
      }, 700);
    });
  }

  return {
    top: _scrollTop,
    bottom: _scrollBottom,
  };
}());