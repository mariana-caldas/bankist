'use strict';

///////////////////////////////////////
// Add copy year dynamically

const copyYear = document.querySelector('[data-year]');
copyYear.textContent = new Date().getFullYear();

///////////////////////////////////////
// Cookie Message

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

//Sticky Navigation with Intersection Observer API

/* The header element is being observed by the API since it becomes its "target" and as soon as it is no longer visible 
  on the viewport (root: 0, threshold: 0), which means not being intersectioned anymore, the sticky class is added to it */

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNavCallback = function(entries){
  /* Entries represents the threshold options.
    Since there is only one option this time, the entry is just destructured from entries
  */
  const [entry] = entries;
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
}

const stickyOptions = {
  root: null, //by using null, the viewport is defined as the root
  threshold: 0, //by using 0, the threshold is defined as soon as the header element is no longer visible
  rootMargin: `-${navHeight}px` //that makes the sticky navigation appears before the section starts to prevent content overlapping
}
const headerObserver = new IntersectionObserver(stickyNavCallback, stickyOptions);
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections with Intersection Observer API
const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer){
 const [entry] = entries //get the threshold option
 if (!entry.isIntersecting) return;
 entry.target.classList.remove('section--hidden');
 observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //consider viewport as the root
  threshold: 0.15 // the section will be revealed when it is 15% visible
});

allSections.forEach( function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

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
