'use strict';

///////////////////////////////////////
// Add copy year dynamically

const copyYear = document.querySelector('[data-year]');
copyYear.textContent = new Date().getFullYear();

///////////////////////////////////////
// Cookie Message

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn" data-close-cookie>Got it!</button>';
header.before(message);

const closeCookie = document.querySelector('[data-close-cookie]');
closeCookie.addEventListener('click', function () {
  message.remove();
});

///////////////////////////////////////
// Scrolling to first section

const btnScrollTo = document.querySelector('[data-scroll-to]');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Navigation 

// Scrolling with event delegation
const navLinksWrapper = document.querySelector('[data-nav-links]');

navLinksWrapper.addEventListener('click', function(e){
  e.preventDefault();
  
  if(e.target.hasAttribute('data-nav-link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
  }
});

///////////////////////////////////////
// Tabbed component

const tabTrigger = document.querySelectorAll('[data-tab]');
const tabContainer = document.querySelector('[data-tab-container]');
const tabContent = document.querySelectorAll('[data-tab-content]');

tabContainer.addEventListener('click', function(e){
  const clickedBtn = e.target.closest('[data-tab]');

  //Guard clause
  if(!clickedBtn) return;

  //Activate tab
  tabTrigger.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedBtn.classList.add('operations__tab--active');

  //Activate content area
  tabContent.forEach(tab => tab.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clickedBtn.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
// Modal window

const modal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const btnCloseModal = document.querySelector('[data-modal-close]');
const btnsOpenModal = document.querySelectorAll('[data-modal-open]');

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
