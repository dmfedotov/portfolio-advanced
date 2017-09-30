export default (function () {
  const burgerToggle = $('.nav-toggle');
  const burgerToggleBtn = $('.nav-toggle__button');
  const fsNav = $('.fullscreen-nav');
  const navItems = $('.nav__item_fullscreen');

  burgerToggle.click(e => {
    e.preventDefault();
    let timer = 250;

    fsNav.toggleClass('fullscreen-nav_active');
    burgerToggleBtn.toggleClass('nav-toggle__button_close');

    navItems.each((i, item) => {
      if ($(item).hasClass('nav__item_fullscreen')) {
        setTimeout(function () {
          $(item).toggleClass('nav__item_fullscreen_active');
        }, timer);
        timer += 100;
      } else {
        $(item).toggleClass('nav__item_fullscreen_active');
      }

      if (burgerToggleBtn.hasClass('nav-toggle__button_close')) {
        $('body').css('overflow', 'hidden');
      } else {
        $('body').css('overflow', 'initial');
      }
    });

  });

}());