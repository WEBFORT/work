/* ==========================================================================
   «Ваше Здоровье» — общий JS (для вёрстальщика)
   Подключается на ВСЕХ страницах перед закрывающим </body>:
   <script src="main.js"></script>
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Тень у шапки при скролле ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. Появление блоков при скролле (.reveal и .stagger) ---------- */
  var revealEls = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3. Счётчики чисел (data-countup) — числа в hero и т.п. ---------- */
  var counters = document.querySelectorAll('[data-countup]');
  if (counters.length && !reduceMotion) {
    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-countup'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2200;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        countIo.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countIo.observe(el); });
  }

  /* ---------- 4. Кнопки «В корзину» — короткая анимация подтверждения ---------- */
  document.querySelectorAll('.add-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('is-added')) return;
      var original = btn.textContent;
      btn.classList.add('is-added');
      btn.textContent = 'Добавлено ✓';

      // мини-анимация «улёт» иконки к корзине
      var badge = document.querySelector('.cart-badge');
      if (badge) {
        badge.style.animation = 'none';
        void badge.offsetWidth; // reflow, чтобы перезапустить анимацию
        badge.style.animation = 'badgeBounce .5s ease';
        var current = parseInt(badge.textContent, 10) || 0;
        badge.textContent = current + 1;
      }

      setTimeout(function () {
        btn.classList.remove('is-added');
        btn.textContent = original;
      }, 1400);
    });
  });

  /* ---------- 5. Избранное (сердечко) — переключение с анимацией ---------- */
  document.querySelectorAll('.wish').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('is-liked');
      btn.style.animation = 'none';
      void btn.offsetWidth;
      btn.style.animation = 'popIn .35s ease';
    });
  });

  /* ---------- 6. Степпер количества в корзине (+/-) ---------- */
  document.querySelectorAll('.cart-row .qty').forEach(function (qty) {
    var input = qty.querySelector('input');
    var minus = qty.querySelectorAll('button')[0];
    var plus = qty.querySelectorAll('button')[1];
    if (!input || !minus || !plus) return;
    minus.addEventListener('click', function () {
      var v = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
      input.value = v;
    });
    plus.addEventListener('click', function () {
      var v = (parseInt(input.value, 10) || 1) + 1;
      input.value = v;
      input.style.animation = 'none';
      void input.offsetWidth;
      input.style.animation = 'popIn .25s ease';
    });
  });

  /* ---------- 7. Удаление строки корзины — плавное исчезновение ---------- */
  document.querySelectorAll('.cart-row .remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.cart-row');
      if (!row) return;
      row.style.transition = 'opacity .3s ease, transform .3s ease, max-height .3s ease, margin .3s ease, padding .3s ease';
      row.style.maxHeight = row.offsetHeight + 'px';
      requestAnimationFrame(function () {
        row.style.opacity = '0';
        row.style.transform = 'translateX(24px)';
        row.style.maxHeight = '0px';
        row.style.marginBottom = '0px';
        row.style.paddingTop = '0px';
        row.style.paddingBottom = '0px';
        row.style.overflow = 'hidden';
      });
      setTimeout(function () { row.remove(); }, 320);
    });
  });

  /* ---------- 8. Каталог: переключатель вида плитка/список ---------- */
  document.querySelectorAll('.view-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  });

  /* ---------- 9. Бургер-меню (мобильная навигация) ---------- */
  var burger = document.getElementById('burgerBtn');
  var drawer = document.getElementById('mobileDrawer');
  var overlay = document.getElementById('mobileOverlay');
  var drawerClose = document.getElementById('drawerClose');

  if (burger && drawer && overlay) {
    var openMenu = function () {
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      overlay.classList.add('is-open');
      document.body.classList.add('menu-open');
    };
    var closeMenu = function () {
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    burger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    if (drawerClose) drawerClose.addEventListener('click', closeMenu);

    // Закрыть по Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeMenu();
    });

    // Закрыть меню при клике на любую ссылку внутри него (переход на другую страницу/якорь)
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Если окно расширили обратно на десктоп — закрыть меню автоматически
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && drawer.classList.contains('is-open')) closeMenu();
    });
  }

  /* ---------- 10. Точка на пульсирующей линии — отключаем движение при reduce-motion ---------- */
  if (reduceMotion) {
    document.querySelectorAll('animateMotion').forEach(function (el) {
      el.parentNode.removeChild(el); // точка остаётся неподвижно в начале линии
    });
  }

  /* ---------- 11. Кнопка «Наверх» ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.scrollY > 500) backToTop.classList.add('is-visible');
      else backToTop.classList.remove('is-visible');
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

}); /* DOMContentLoaded */
