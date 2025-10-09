// Client-safe Firebase initialization for Astro
// Dynamically imports Firebase only in the browser to avoid SSR/window issues.

const firebaseConfig = {
  apiKey: "AIzaSyCHqDHGx_Tftybm_xlEUtjZOg4v7A9vO7M",
  authDomain: "wm-smile-generation-ugan-9d0c4.firebaseapp.com",
  projectId: "wm-smile-generation-ugan-9d0c4",
  storageBucket: "wm-smile-generation-ugan-9d0c4.firebasestorage.app",
  messagingSenderId: "225839639421",
  appId: "1:225839639421:web:fc9c53ad1e8efb61263a14",
  measurementId: "G-X5TTSE7XTV"
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
