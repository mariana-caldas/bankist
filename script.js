'use strict';

///////////////////////////////////////
// Add copy year dynamically

const copyYear = document.querySelector('[data-year]');
copyYear.textContent = new Date().getFullYear();

///////////////////////////////////////
// Cookie Message

const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn" data-close-cookie>Got it!</button>';
footer.after(message);

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

// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el => {
     if (el !== link ) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}
//Setting "this" manually through "bind" to pass the opacity as an "argument" into the handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation
const section1Coord = section1.getBoundingClientRect();
console.log("Corrdinates section 1", section1Coord);

window.addEventListener('scroll', function(){
 if (window.scrollY > section1Coord.top) {
   nav.classList.add('sticky');
 } else {
   nav.classList.remove('sticky');
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
