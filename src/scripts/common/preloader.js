export default (function () {
  const _preloader = $('.preloader');
  var _persentsTotal = 0;

  var _imagesPath = $('*').map(function (index, elem) {
    var _background = $(elem).css('background-image');
    var _path = '';
    var _isImage = $(elem).is('img');

    if (_background != 'none') {
      _path = _background.replace('url("', '').replace('")', '');
    }

    if (_isImage) {
      _path = $(elem).attr('src');
    }

    if (_path) return _path;
  });

  var _setPersents = function (total, current) { 

    var _persents = Math.ceil(current / total * 100);
    $('.preloader-elem__text').text(_persents);
    if (_persents >= 100) {
      _preloader.addClass('preloader_hide');
    }
  };

  var _loadImages = function (images) {
    if (!images.length) {
      _preloader.addClass('preloader_hide');
    }

    images.forEach(function (img, index, images) {
      var _copyImages = $('<img>', {
        attr: {
          src: img,
        },
      });

      _copyImages.on('load', function () {
        _persentsTotal++;
        _setPersents(images.length, _persentsTotal);
      });
    });
  };

  return {
    init: function () {
      var imgs = _imagesPath.toArray();
      _loadImages(imgs);
    },
  };
}());