'use strict';

///////////////////////////////////////
// Add copy year dynamically

const copyYear = document.querySelector('[data-year]');
copyYear.textContent = new Date().getFullYear();

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
