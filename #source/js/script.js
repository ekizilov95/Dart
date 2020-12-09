"use strict";

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // header burger

  const burger = document.querySelector(".header__menu-burger"),
    menu = document.querySelector(".menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("header__menu-burger_active");
    menu.classList.toggle("menu_active");
  });

  //  Spoilers
  document.querySelectorAll(".spoilers__header").forEach((item) => {
    item.addEventListener("click", () => {
      item.parentNode.classList.toggle("spoilers__item_active");
    });
  });

  // reviews

  const revBtn = document.querySelector(".reviews__btn"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  revBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
  });
  modalCloseBtn.addEventListener("click", () => {
    modal.classList.toggle("show");
    document.body.style.overflow = "auto";
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      modal.classList.remove("show");
    }
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Animation Scroll

  const animItems = document.querySelectorAll("._anim-items");

  if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);

    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add("_anim-active");
        } else {
          animItem.classList.remove("_anim-active");
        }
      }
    }

    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      };
    }

    setTimeout(() => {
      animOnScroll();
    }, 400);
  }

  const wrapper = document.querySelector(".slider__wrapper"),
    track = document.querySelector(".slider__track"),
    slides = document.querySelectorAll(".slider__item"),
    upBtn = document.querySelector(".slider__up-arrow"),
    downBtn = document.querySelector(".slider__down-arrow"),
    slider = document.querySelector(".slider"),
    slideHeight = window.getComputedStyle(wrapper).height;
  let position = 0,
    showSlides = 2;

  function showQuantitySlides() {
    if (window.innerWidth <= 752) {
      showSlides = 1;
    } else {
      showSlides = 2;
    }
  }
  showQuantitySlides();

  track.style.height = 50 * slides.length + "%";

  slides.forEach((slide) => {
    slide.style.height =
      slideHeight.slice(0, slideHeight.length - 2) / showSlides + "px";
  });

  upBtn.addEventListener("click", () => {
    if (position == 0) {
      position =
        (+slideHeight.slice(0, slideHeight.length - 2) / showSlides) *
        (slides.length - 1);
    } else {
      position -= +slideHeight.slice(0, slideHeight.length - 2) / showSlides;
    }

    track.style.transform = `translateY(-${position}px)`;
  });

  downBtn.addEventListener("click", downSlide);

  function downSlide() {
    if (
      position ==
      (+slideHeight.slice(0, slideHeight.length - 2) / showSlides) *
        (slides.length - 1)
    ) {
      position = 0;
    } else {
      position += +slideHeight.slice(0, slideHeight.length - 2) / showSlides;
    }

    track.style.transform = `translateY(-${position}px)`;
  }

  let hover;

  slider.addEventListener("mousemove", () => (hover = 1));
  slider.addEventListener("mouseout", () => (hover = 0));

  setInterval(() => !hover && downSlide(), 5000);

  // TABS

  const iconsParent = document.querySelector(".tab__images"),
    tabsContent = document.querySelectorAll(".tab__content"),
    tabs = document.querySelectorAll(".tab__img");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tab__img_active");
    });
  }

  function showTabContent(i = 1) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tab__img_active");
  }
  hideTabContent();
  showTabContent();

  iconsParent.addEventListener("mousemove", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tab__img")) {
      tabs.forEach((tab, i) => {
        if (tab == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Form
});
