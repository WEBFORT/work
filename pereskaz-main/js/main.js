'use strict';

(function () {
  const MENU = document.getElementById('primary-nav');
  const SEARCH = document.getElementById('mobile-search');
  const BACKDROP = document.querySelector('[data-menu-backdrop]');
  const MENU_TOGGLE = document.querySelector('[data-menu-toggle]');
  const SEARCH_TOGGLE = document.querySelector('[data-search-toggle]');
  const MENU_CLOSE = document.querySelector('[data-close-nav]');
  const TO_TOP = document.querySelector('[data-to-top]');

  function setInert(el, inert) {
    if (!el) return;
    if (inert) {
      el.setAttribute('inert', '');
    } else {
      el.removeAttribute('inert');
    }
  }

  function openMenu() {
    if (!MENU || !BACKDROP || !MENU_TOGGLE) return;
    MENU.classList.add('is-open');
    BACKDROP.classList.add('is-visible');
    MENU_TOGGLE.classList.add('is-open');
    MENU_TOGGLE.setAttribute('aria-expanded', 'true');
    setInert(MENU, false);
    document.body.style.overflow = 'hidden';
    const firstLink = MENU.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (!MENU || !BACKDROP || !MENU_TOGGLE) return;
    MENU.classList.remove('is-open');
    BACKDROP.classList.remove('is-visible');
    MENU_TOGGLE.classList.remove('is-open');
    MENU_TOGGLE.setAttribute('aria-expanded', 'false');
    setInert(MENU, true);
    document.body.style.overflow = '';
    MENU_TOGGLE.focus();
  }

  function toggleMenu() {
    const isOpen = MENU && MENU.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      closeSearch();
      openMenu();
    }
  }

  function openSearch() {
    if (!SEARCH || !SEARCH_TOGGLE) return;
    SEARCH.classList.add('is-open');
    SEARCH.setAttribute('aria-hidden', 'false');
    SEARCH_TOGGLE.setAttribute('aria-expanded', 'true');
    setInert(SEARCH, false);
    const input = SEARCH.querySelector('input[type="search"]');
    if (input) input.focus();
  }

  function closeSearch() {
    if (!SEARCH || !SEARCH_TOGGLE) return;
    SEARCH.classList.remove('is-open');
    SEARCH.setAttribute('aria-hidden', 'true');
    SEARCH_TOGGLE.setAttribute('aria-expanded', 'false');
    setInert(SEARCH, true);
  }

  function toggleSearch() {
    const isOpen = SEARCH && SEARCH.classList.contains('is-open');
    if (isOpen) {
      closeSearch();
      SEARCH_TOGGLE.focus();
    } else {
      openSearch();
    }
  }

  if (MENU_TOGGLE) MENU_TOGGLE.addEventListener('click', toggleMenu);
  if (SEARCH_TOGGLE) SEARCH_TOGGLE.addEventListener('click', toggleSearch);
  if (MENU_CLOSE) MENU_CLOSE.addEventListener('click', closeMenu);
  if (BACKDROP) BACKDROP.addEventListener('click', function () {
    closeMenu();
    closeSearch();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (MENU && MENU.classList.contains('is-open')) {
        closeMenu();
      } else if (SEARCH && SEARCH.classList.contains('is-open')) {
        closeSearch();
        SEARCH_TOGGLE.focus();
      }
    }
  });

  if (TO_TOP) {
    TO_TOP.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
      TO_TOP.hidden = window.scrollY < 400;
    }, { passive: true });
  }
})();