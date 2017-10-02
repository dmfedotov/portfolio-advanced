export default (function () {
  $(document).ready(function () {

    const btn = $('.welcome__auth-btn');
    const flipper = $('.flipper');
    const btnBack = $('#btn-main');
    const overlay = $('.welcome-overlay');
    const form = document.querySelector('#auth-form');

    btn.click(e => {
      e.preventDefault();

      flipper.toggleClass('flipper_back');
      btn.css('opacity', '0');
    });

    btnBack.click(e => {
      flipper.toggleClass('flipper_back');
      btn.css('opacity', '1');
      form.reset();
    });

    $(window).keydown(e => {
      if (e.keyCode === 27) {
        if (flipper.hasClass('flipper_back')) {
          flipper.removeClass('flipper_back');
          btn.css('opacity', '1');
          form.reset();
        }
      }
    });

    overlay.click(e => {
      if (flipper.hasClass('flipper_back')) {
        flipper.removeClass('flipper_back');
        btn.css('opacity', '1');
        form.reset();
      }
    });

  });
}());