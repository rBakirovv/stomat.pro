window.addEventListener("DOMContentLoaded", function () {

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
      // центр карты = точка
        center: [55.663586, 37.702784],
        zoom: 16,
      }),
      myStreet1 = new ymaps.Placemark(
        [55.663586, 37.702784], {}, {
          iconLayout: "default#image",
          iconImageHref: "img/map-icon.svg",
          iconImageSize: [102, 102],
          iconImageOffset: [-30, -60],
        }
      );
    myMap.geoObjects.add(myStreet1);
    myMap.behaviors.disable("scrollZoom");
  }
});