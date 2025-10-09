// Plain JS contact form handler using Firebase Firestore via CDN compat SDK
(function () {
  if (typeof window === 'undefined') return;

  var firebaseConfig = {
  apiKey: "AIzaSyCHqDHGx_Tftybm_xlEUtjZOg4v7A9vO7M",
  authDomain: "wm-smile-generation-ugan-9d0c4.firebaseapp.com",
  projectId: "wm-smile-generation-ugan-9d0c4",
  storageBucket: "wm-smile-generation-ugan-9d0c4.firebasestorage.app",
  messagingSenderId: "225839639421",
  appId: "1:225839639421:web:fc9c53ad1e8efb61263a14",
  measurementId: "G-X5TTSE7XTV"
  };

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function (e) { reject(e); };
      document.head.appendChild(s);
    });
  }

  function ensureFirebaseWithFirestore() {
    var core = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    var firestore = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';

    var p = Promise.resolve();
    if (typeof window.firebase === 'undefined') {
      p = loadScript(core).then(function () {
        if (!window.firebase.apps || !window.firebase.apps.length) {
          try { window.firebase.initializeApp(firebaseConfig); } catch (_) {}
        }
      });
    }
    return p.then(function () { return loadScript(firestore).catch(function () { /* ignore */ }); });
  }

  function bindForm() {
    var form = document.querySelector('#contactForm');
    var statusEl = document.querySelector('#formStatus');
    var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (!form || !submitBtn || !statusEl) return;
    if (form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity || !form.checkValidity()) {
        if (form.reportValidity) form.reportValidity();
        return;
      }

      statusEl.textContent = '';
      statusEl.classList.remove('text-red-600', 'text-green-700');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      ensureFirebaseWithFirestore()
        .then(function () {
          var db = window.firebase.firestore();
          var payload = {
            name: (form.elements.namedItem('name') || {}).value ? (form.elements.namedItem('name').value || '').trim() : '',
            email: (form.elements.namedItem('email') || {}).value ? (form.elements.namedItem('email').value || '').trim() : '',
            subject: (form.elements.namedItem('subject') || {}).value ? (form.elements.namedItem('subject').value || '').trim() : '',
            message: (form.elements.namedItem('message') || {}).value ? (form.elements.namedItem('message').value || '').trim() : '',
            createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
            source: 'contact-page',
          };
          return db.collection('contactMessages').add(payload);
        })
        .then(function () {
          if (form.reset) form.reset();
          statusEl.textContent = 'Thanks! Your message has been sent.';
          statusEl.classList.add('text-green-700');
        })
        .catch(function (err) {
          console.error('Failed to submit contact form:', err);
          statusEl.textContent = 'Sorry, something went wrong. Please try again later.';
          statusEl.classList.add('text-red-600');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindForm, { once: true });
  } else {
    bindForm();
  }
})();
