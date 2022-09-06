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

allSections.forEach(function (section) {
  sectionObs.observe(section);
  section.classList.add('section--hidden');
});
