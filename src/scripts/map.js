$(function () {
  ymaps.ready(init);

  const map;
  const myPlacemark;
  const myPin;

  function init() {
    map = new ymaps.Map('yandex-map', {
      center: [56.31508868, 43.99087565],
      zoom: 16,
    });

    map.behaviors.disable([
      'scrollZoom',
    ]);

    // map.controls
    // .remove('geolocationControl')
    // .remove('searchControl')
    // .remove('trafficControl')
    // .remove('typeSelector')
    // .remove('fullscreenControl')
    // .remove('zoomControl')
    // .remove('rulerControl');

    // myPlacemark = new ymaps.Placemark([55.75399400, 37.62209300], {});
    // myPin.add(myPlacemark);
    // map.geoObjects.add(myPin);
  }
});