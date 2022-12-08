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

  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  let tabNav = document.querySelectorAll('.options__tab'),
    tabContent = document.querySelectorAll('.options__content-container'),
    tabName;

  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav)
  });

  function selectTabNav() {
    tabNav.forEach(item => {
      item.classList.remove('options__tab_active');
    });
    this.classList.add('options__tab_active');
    tabName = this.getAttribute('data-tab-name');
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName) ? item.classList.add('options__content-container_active') : item.classList.remove('options__content-container_active');
    })
  }
});