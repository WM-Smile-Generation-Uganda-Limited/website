// Plain JS Firebase initialization for browser (no modules)
// Loads Firebase SDKs from CDN and initializes the app.
(function () {
  if (typeof window === 'undefined') return; // SSR guard
  if (window.__FIREBASE_APP_INITIALIZED__) return; // idempotent

  // Firebase config copied from src/lib/firebase.ts
  var firebaseConfig = {
    apiKey: "AIzaSyCHqDHGx_Tftybm_xlEUtjZOg4v7A9vO7M",
    authDomain: "wm-smile-generation-ugan-9d0c4.firebaseapp.com",
    projectId: "wm-smile-generation-ugan-9d0c4",
    storageBucket: "wm-smile-generation-ugan-9d0c4.firebasestorage.app",
    messagingSenderId: "225839639421",
    appId: "1:225839639421:web:fc9c53ad1e8efb61263a14",
    measurementId: "G-X5TTSE7XTV"
  };

  // Helper to load a script only once
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      // If already present, resolve immediately
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

  function init() {
    if (window.__FIREBASE_APP_INITIALIZED__) return;
    try {
      // Initialize app
      var app = window.firebase.initializeApp(firebaseConfig);

      // Initialize analytics if supported (will no-op if analytics script not loaded)
      if (typeof window.firebase.analytics === 'function') {
        try { window.firebase.analytics(app); } catch (_) {}
      }

      window.__FIREBASE_APP_INITIALIZED__ = true;
    } catch (_) {
      // Swallow errors to avoid breaking the page
    }
  }

  // Load Firebase compat SDKs (namespaced, suitable for non-module usage)
  // Using version 9 compat build for broad browser support via CDN.
  var core = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  var analytics = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics-compat.js';

  loadScript(core)
    .then(function () { return loadScript(analytics).catch(function () { /* ignore */ }); })
    .then(init)
    .catch(function () {
      // Ignore loading errors to avoid breaking the page
    });
})();
