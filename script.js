'use strict';

const nav = document.querySelector('.nav');
const navBtns = document.querySelector('.nav__links');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const blurImgs = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Handling modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Handling navigation

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navBtns.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const curId = e.target.getAttribute('href');
    document.querySelector(curId).scrollIntoView({ behavior: 'smooth' });
  }
});

// Handling tab section

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//  Navigation fading

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hoverLink = e.target;
    const otherLinks = hoverLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = hoverLink.closest('.nav').querySelector('img');

    otherLinks.forEach(l => {
      if (l !== hoverLink) {
        l.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObs.observe(header);

//Sections reveal

const sectionReveal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.17,
});

allSections.forEach(section => {
  sectionObs.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy Loading images

const imgReveal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObs = new IntersectionObserver(imgReveal, {
  root: null,
  threshold: 0,
  // rootMargin: '200px',
});

blurImgs.forEach(img => imgObs.observe(img));

let john = { name: 'John' };
let array = [john];
john = null;
console.log(array[0]);

// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  const maxSlides = slides.length;
  let currentSlide = 0;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"> </button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlides - 1;
    } else currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const initSlider = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  initSlider();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(currentSlide);
    }
  });

  document.addEventListener('keydown', e => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
};

slider();
