export default (function () {

  // Переменные с которыми будем работать
  const _preloader = document.querySelector('.preloader');
  const _preloaderText = _preloader.querySelector('.preloader-elem__text');
  const _preloaderCircle = _preloader.querySelectorAll('.preloader-elem__inner');
  const _images = document.images;
  const _imagesCount = _images.length; // кол-во картинок на странице
  let _imagesLoaded = 0; // кол-во загруженных картинок, изначально 0


  // Обработка прелоадера
  const _preloaderLoad = () => {
    // После загрузки картинки, увеличиваем общий счетчик
    _imagesLoaded++;
    // Процент загрузки, который будет выводиться в прелодаер
    let _percent = Math.round((100 / _imagesCount) * _imagesLoaded);
    _preloaderText.innerHTML = _percent + '%';
    // Считаем значение strokDasharray элемента и в соответствии с выше полученным процентом
    // увеличиваем это значение - иначе говоря рисуем процесс загрузки
    _preloaderCircle.forEach((element) => {
      let _dasharrayLenght = element.getAttribute('r') * 2 * Math.PI;
      setTimeout(() => {
        element.style.strokeDasharray = _percent / 100 * _dasharrayLenght + ', ' + _dasharrayLenght;
      }, 500);
      console.log('загружено после выполнения _preloaderLoad: ', _imagesLoaded);
    });

    // Если кол-во загруженных картинок совпадает с общим кол-вом на странице, скрываем прелоадер
    if (_imagesLoaded >= _imagesCount) {
      console.log('все картинки загружены. отключаем прелодаер');
      // Задержка в 1.5 секунды, чтобы при быстрой загрузке сразу не пропадал
      setTimeout(() => {
        _preloader.classList.add('preloader_hide');
      }, 1500);
    }
  };


  // Основная функция
  const _imgLoading = () => {
    console.log('зашли в ф-ю');
    // Получаем пути всех картинок в переборе
    for (let i = 0; i < _imagesCount; i++) {
      console.log('зашли в цикл');
      let src = _images[i].src;
      // Возвращает промис, который создает новую картинку
      // В параметр source передается адрес картинки
      const _loadImage = function (source) {
        return new Promise((resolve, reject) => {
          console.log('зашли в промис');
          let _image = new Image();
          _image.onload = resolve;
          _image.onerror = reject;
          _image.src = source;
        });
      };


      // Обработка промиса
      _loadImage(src)
        .then(() => {
          console.log('загружено до _preloaderLoad: ', _imagesLoaded);
          _preloaderLoad();
        },
        () => {
          console.error('ERROR: Картинка по пути ' + src + ' не загружена ☹');
        });
    }
  };



  /// API ///
  // init - запуск прелоадера
  return {
    init: _imgLoading,
  };

}());