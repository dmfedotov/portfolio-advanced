export const parallax = (function () {
  const parallaxContainer = $('.parallax');
  const layers = $('.parallax__layer');

  const moveLayers = e => {
    const initialX = (window.innerWidth / 2) - e.pageX;
    const initialY = (window.innerHeight / 2) - e.pageY;

    layers.each((i, layer) => {
      const divider = i / 200; // множитель скорости движения паралакса
      const positionX = initialX * divider;
      const positionY = initialY * divider;
      const image = $('.parallax__layer-img');
      const video = $('.parallax__layer-video');
      const bottomPosition = (window.innerHeight / 2) * divider; // размещает слой, чтобы избежать бага
      const leftPosition = (window.innerWidth / 2) * divider;

      let transformString = `translate(${positionX}px, ${positionY}px)`;

      $(layer).css('transform', transformString);
      image.css('bottom', `-${bottomPosition}px`);
      video.css('left', `-${leftPosition}px`);
    });
  };

  const scrollLayers = () => {
    const image = $('.parallax__layer-img');
    
  };

  parallaxContainer.mousemove(moveLayers);

}());