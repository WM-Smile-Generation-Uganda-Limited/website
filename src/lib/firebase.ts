// Client-safe Firebase initialization for Astro
// Dynamically imports Firebase only in the browser to avoid SSR/window issues.

const firebaseConfig = {
  apiKey: "AIzaSyDHsY2V-jQsAt7nFwdyRqXl-rNtkWbGc8U",
  authDomain: "wm-smile-generation-uganda.firebaseapp.com",
  projectId: "wm-smile-generation-uganda",
  storageBucket: "wm-smile-generation-uganda.firebasestorage.app",
  messagingSenderId: "791580202941",
  appId: "1:791580202941:web:11c56beb1f0185bb6de4d4",
  measurementId: "G-PFSD62TYHS",
};

let initialized = false;

export async function initFirebase(): Promise<void> {
  if (initialized) return;
  if (typeof window === 'undefined') return; // Only run in the browser

  // Initialize core app
  const { initializeApp, getApps, getApp } = await import('firebase/app');
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // Initialize Analytics if supported
  try {
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    const supported = await isSupported();
    if (supported) {
      getAnalytics(app);
    }
  } catch (err) {
    // Analytics might not be available in some environments; fail silently.
  }

  initialized = true;
}

// Optional: expose a no-op for SSR imports
export default initFirebase;
