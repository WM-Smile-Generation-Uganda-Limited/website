// Plain JS partnership form handler using Firebase Firestore via CDN compat SDK
(function () {
  if (typeof window === 'undefined') return;

  var firebaseConfig = {
    apiKey: "AIzaSyDHsY2V-jQsAt7nFwdyRqXl-rNtkWbGc8U",
    authDomain: "wm-smile-generation-uganda.firebaseapp.com",
    projectId: "wm-smile-generation-uganda",
    storageBucket: "wm-smile-generation-uganda.firebasestorage.app",
    messagingSenderId: "791580202941",
    appId: "1:791580202941:web:11c56beb1f0185bb6de4d4",
    measurementId: "G-PFSD62TYHS",
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
    var form = document.querySelector('#partnershipForm');
    var statusEl = document.querySelector('#partnerFormStatus');
    var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (!form || !statusEl || !submitBtn) return;
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
          var getVal = function (name) {
            var el = form.elements.namedItem(name);
            return el && el.value ? (el.value || '').trim() : '';
          };
          var org = getVal('organization');
          var payload = {
            name: getVal('name'),
            organization: org || null,
            email: getVal('email'),
            message: getVal('message'),
            createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
            source: 'partnership-page',
          };
          return db.collection('partnershipInquiries').add(payload);
        })
        .then(function () {
          if (form.reset) form.reset();
          statusEl.textContent = 'Thanks! Your inquiry has been sent. We will get back to you shortly.';
          statusEl.classList.add('text-green-700');
        })
        .catch(function (err) {
          console.error('Failed to submit partnership form:', err);
          statusEl.textContent = 'Sorry, something went wrong. Please try again later.';
          statusEl.classList.add('text-red-600');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Inquiry';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindForm, { once: true });
  } else {
    bindForm();
  }
})();
