export default (function () {
  const _sidebar = $('.blog__left'); // Сайдбар

  ////// Открытие сайдбара по клику на кнопку при планшетной ширине и меньше
  function _openSidebar() {
    const _openBtn = $('.blog__btn-sidebar-open');
    _openBtn.click(() => {
      _sidebar.toggleClass('blog__left_open');
    });
  }
  _openSidebar();

  ////// Фиксация сайдбара при помощи position: fixed
  function _fixSidebar() {
    const _header = $('.header_blog'); // шапка страницы
    const _navBlock = $('.blog__nav'); // сайдбар
    var _articles = $('.blog__article'); // все статьи блога

    $(window).scroll(() => {
      // Если проскролили больше высоты хедера + отступ и ширина окна больше планшетной, то фиксируем сайдбар
      if ($(window).scrollTop() > _header.height() + 55 && !window.matchMedia('(max-width: 990px)').matches) {
        _navBlock.addClass('blog__nav_fixed');
        // Иначе убираем фиксацию
      } else {
        _navBlock.removeClass('blog__nav_fixed');
      }

      ////// Навигация по статьям
      // Пробегаемся по статьям и собираем данные в каких позициях они расположены
      _articles.each((i, elem) => {
        var _top = $(elem).offset().top - 300;
        var _bottom = _top + $(elem).height();
        var _scroll = $(window).scrollTop();
        var _articleId = $(elem).attr('id'); // Получаем id статьи (он такой же, как href пункта меню навигации)

        // Проверяем сколько проскролили и вешаем активный класс
        if (_scroll > _top && _scroll < _bottom) {
          var _navItem = $('.nav__link_blog');
          _navItem.removeClass('nav__link_blog_active');
          //  На пукнт меню, у которого href равен id статьи, вешаем активный класс
          $('a[href="#' + _articleId + '"]').addClass('nav__link_blog_active');
        }
      });
    });
  }
  _fixSidebar();

  ////// Навигация по статьям по клику на элемент навигации
  $('.nav__link_blog').click(function (e) {
    e.preventDefault();
    // получаем href ссылки на статью (href и id у статей должны быть одинаковые)
    var _idLink = $(this).attr('href');
    // высота над которой расположен блок
    var _topOffsetLink = $(_idLink).offset().top;
    // анимация перехода к блоку
    $('body,html').animate({
      scrollTop: _topOffsetLink,
    }, 700);
  });

}());