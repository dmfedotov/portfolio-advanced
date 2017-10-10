const _preloader = document.querySelector('.preloader');
const _preloaderText = _preloader.querySelector('.preloader-elem__text');
const _preloaderCircle = _preloader.querySelectorAll('.preloader-elem__inner');
const _images = document.images;
const _imagesCount = _images.length;
let _imagesLoaded = 0;

let _imagesPath = [];

for (let i = 0; i < _imagesCount; i++) {
  let _imgPath = _images[i].src;
  _imagesPath.push(_imgPath);
}

// Обработка прелоадера
const _preloaderLoad = () => {
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
  });
  console.log('загружено после выполнения _preloaderLoad: ', _imagesLoaded);

  // Если кол-во загруженных картинок совпадает с общим кол-вом на странице, скрываем прелоадер
  if (_imagesLoaded >= _imagesCount) {
    console.log('все картинки загружены. отключаем прелодаер');
    // Задержка в 1.5 секунды, чтобы при быстрой загрузке сразу не пропадал
    setTimeout(function () {
      _preloader.classList.add('preloader_hide');
    }, 1500);
  }
};

function _loadImage(url) {
  return new Promise((resolve, reject) => {
    let _image = new Image();
    _image.onload = () => resolve(url);
    _image.onerror = () => reject(url);
  });
  _image.src = url;
}

function _displayImages(_imagesPath) {
  var _imgSrc = _imagesPath.shift();
  if (!_imgSrc) return;

  return _loadImage(_imgSrc)
    .then(function (url) {
      
    });
}
