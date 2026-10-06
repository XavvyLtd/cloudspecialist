// CloudSpecialist AI — progressive enhancements shared by all pages
(function () {
  document.documentElement.classList.add('js');

  // Header border once the page scrolls
  var header = document.querySelector('.header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    var setOpen = function (open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('nav-open'));
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Reveal-on-scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form -> pre-filled email
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var body =
        'Name: ' + name + '\n' +
        'Work Email: ' + (data.get('email') || '') + '\n' +
        (data.get('company') ? 'Company: ' + data.get('company') + '\n' : '') +
        'Primary Environment: ' + (data.get('environment') || '') + '\n' +
        (data.get('timeline') ? 'Timeline: ' + data.get('timeline') + '\n' : '') + '\n' +
        'What we are trying to solve:\n' + (data.get('context') || '');
      var mailto = 'mailto:hello@cloudspecialist.work' +
        '?subject=' + encodeURIComponent('Architecture Conversation with ' + name) +
        '&body=' + encodeURIComponent(body);
      try {
        window.location.href = mailto;
      } catch (err) {
        if (navigator.clipboard) navigator.clipboard.writeText(body);
        alert('Details copied to clipboard. Please email hello@cloudspecialist.work');
      }
    });
  }
})();
