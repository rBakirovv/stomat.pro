window.addEventListener("DOMContentLoaded", function () {

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
        // центр карты = точка
        center: [55.732120, 37.588526],
        zoom: 16,
      }),
      myStreet1 = new ymaps.Placemark(
        [55.732120, 37.588526], {}, {
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

      const blockID = anchor.getAttribute('href').substr(1);

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
      item.classList.remove(item.getAttribute('data-tab-name'));
    });
    this.classList.add('options__tab_active');
    tabName = this.getAttribute('data-tab-name');
    this.classList.add(tabName);
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName) ? item.classList.add('options__content-container_active') : item.classList.remove('options__content-container_active');
    })
  }

  const accordionElement = document.querySelectorAll('.options__accordion');

  accordionElement.forEach((element) => {
    element.addEventListener("click", accordionClickHandler);
  })

  function accordionClickHandler(e) {
    const currentAccordion = e.target.closest(".options__accordion");
    currentAccordion.classList.toggle("options__accordion_active");
    currentAccordion.querySelector(".options__accordion-container-span").classList.toggle("options__accordion-container-span_active");
    currentAccordion.querySelector(".options__accordion-arrow").classList.toggle("options__accordion-arrow_active");
    currentAccordion.querySelector(".options__accordion-arrow-path").classList.toggle("options__accordion-arrow-path_active");
    e.preventDefault();

    if (currentAccordion.classList.contains("options__accordion_active")) {
      currentAccordion.querySelector(".options__content-container").style.maxHeight = currentAccordion.querySelector(".options__content-container").scrollHeight + "px";
      currentAccordion.querySelector(".options__content-container").style.overflow = "visible";
    } else {
      currentAccordion.querySelector(".options__content-container").style.maxHeight = 0;
      currentAccordion.querySelector(".options__content-container").style.overflow = "hidden";
    }
  }
});